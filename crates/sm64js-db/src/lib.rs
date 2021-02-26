#[macro_use]
extern crate diesel;

pub mod models;
pub mod schema;

pub use models::{Account, AccountInfo};

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

use actix_session::Session;
use actix_web::{dev::Body, http::StatusCode, HttpResponse, ResponseError};
use chrono::{prelude::*, Duration};
use diesel::{pg::{upsert::on_constraint, PgConnection}, prelude::*, r2d2::ConnectionManager};
use paperclip::actix::api_v2_errors;
use thiserror::Error;

type Result<T> = std::result::Result<T, DbError>;

pub fn insert_discord_session(
    conn: &PgConnection,
    access_token: String,
    token_type: String,
    expires_in: i64,
    new_account: models::NewDiscordAccount,
) -> Result<models::DiscordSession> {
    use schema::discord_sessions;

    let mut account_id = None;
    if let Some(account) = get_discord_account_if_exists(conn, &new_account.id)? {
        account_id = Some(account.account_id);
        if let Ok(session) =
            models::DiscordSession::belonging_to(&account).first::<models::DiscordSession>(conn)
        {
            delete_discord_session(conn, session.id)?;
        }
    }
    let discord_account_id = upsert_discord_account(conn, new_account, account_id)?;

    let expires_at = Utc::now().naive_utc() + Duration::seconds(expires_in);
    let new_session = models::NewDiscordSession {
        access_token,
        token_type,
        expires_at,
        discord_account_id,
    };
    let session: models::DiscordSession = diesel::insert_into(discord_sessions::table)
        .values(&new_session)
        .get_result(conn)?;
    Ok(session)
}

pub fn insert_google_session(
    conn: &PgConnection,
    id_token: String,
    expires_at: i64,
    sub: String,
) -> Result<models::GoogleSession> {
    use schema::google_sessions;

    let mut account_id = None;
    if let Some(account) = get_google_account_if_exists(conn, &sub)? {
        account_id = Some(account.account_id);
        if let Ok(session) =
            models::GoogleSession::belonging_to(&account).first::<models::GoogleSession>(conn)
        {
            delete_google_session(conn, session.id)?;
        }
    }
    let google_account_id = upsert_google_account(conn, sub, account_id)?;

    let expires_at = Utc.timestamp(expires_at, 0).naive_utc();
    let new_session = models::NewGoogleSession {
        id_token,
        expires_at,
        google_account_id,
    };
    let session: models::GoogleSession = diesel::insert_into(google_sessions::table)
        .values(&new_session)
        .get_result(conn)?;
    Ok(session)
}

pub fn get_account_info(conn: &PgConnection, req_session: &Session) -> Result<Option<AccountInfo>> {
    if let (Ok(Some(account_id)), Ok(Some(session_id)), Ok(Some(token))) = (
        req_session.get::<String>("discord_account_id"),
        req_session.get::<i32>("discord_session_id"),
        req_session.get::<String>("access_token"),
    ) {
        use schema::discord_sessions::dsl::*;

        let session = discord_sessions
            .find(session_id)
            .first(conn);
        
        let session: models::DiscordSession = match session {
            Ok(session) => session,
            Err(diesel::result::Error::NotFound) => return Ok(None),
            Err(err) => return Err(err.into()),
        };

        let is_expired = Utc::now().naive_utc() >= session.expires_at;
        if is_expired {
            diesel::delete(discord_sessions.find(session_id)).execute(conn)?;
            return Err(DbError::SessionExpired);
        }

        if session.access_token != token {
            return Err(DbError::AccessTokenInvalid);
        }

        if session.discord_account_id != account_id {
            return Err(DbError::AccountIdInvalid);
        }

        let discord_account = get_discord_account(conn, &account_id)?;
        let account = get_account(conn, discord_account.account_id)?;
        return Ok(Some(AccountInfo {
            account,
            discord_account: Some(discord_account),
            google_account: None,
        }));
    } else if let (Ok(Some(account_id)), Ok(Some(session_id)), Ok(Some(token))) = (
        req_session.get::<String>("google_account_id"),
        req_session.get::<i32>("google_session_id"),
        req_session.get::<String>("id_token"),
    ) {
        use schema::google_sessions::dsl::*;

        let session = google_sessions
            .find(session_id)
            .first(conn);
        
        let session: models::GoogleSession = match session {
            Ok(session) => session,
            Err(diesel::result::Error::NotFound) => return Ok(None),
            Err(err) => return Err(err.into()),
        };

        let is_expired = Utc::now().naive_utc() >= session.expires_at;
        if is_expired {
            diesel::delete(google_sessions.find(session_id)).execute(conn)?;
            return Err(DbError::SessionExpired);
        }

        if session.id_token != token {
            return Err(DbError::AccessTokenInvalid);
        }

        if session.google_account_id != account_id {
            return Err(DbError::AccountIdInvalid);
        }

        let google_account = get_google_account(conn, &account_id)?;
        let account = get_account(conn, google_account.account_id)?;
        return Ok(Some(AccountInfo {
            account,
            discord_account: None,
            google_account: Some(google_account),
        }));
    }

    Ok(None)
}

fn get_account(conn: &PgConnection, account_id: i32) -> Result<models::Account> {
    use schema::accounts::dsl::*;

    Ok(accounts.find(account_id).first(conn)?)
}

fn get_discord_account(conn: &PgConnection, id: &str) -> Result<models::DiscordAccount> {
    use schema::discord_accounts;

    Ok(discord_accounts::table.find(id).first(conn)?)
}

fn get_google_account(conn: &PgConnection, id: &str) -> Result<models::GoogleAccount> {
    use schema::google_accounts;

    Ok(google_accounts::table.find(id).first(conn)?)
}

fn get_discord_account_if_exists(
    conn: &PgConnection,
    id: &str,
) -> Result<Option<models::DiscordAccount>> {
    use schema::discord_accounts;

    match discord_accounts::table.find(id).first(conn) {
        Ok(account) => Ok(Some(account)),
        Err(diesel::result::Error::NotFound) => Ok(None),
        Err(err) => Err(err.into()),
    }
}

fn get_google_account_if_exists(
    conn: &PgConnection,
    sub: &str,
) -> Result<Option<models::GoogleAccount>> {
    use schema::google_accounts;

    match google_accounts::table.find(sub).first(conn) {
        Ok(account) => Ok(Some(account)),
        Err(diesel::result::Error::NotFound) => Ok(None),
        Err(err) => Err(err.into()),
    }
}

fn delete_discord_session(conn: &PgConnection, key: i32) -> Result<()> {
    use schema::discord_sessions::dsl::*;

    diesel::delete(discord_sessions)
        .filter(id.eq(key))
        .execute(conn)?;
    Ok(())
}

fn delete_google_session(conn: &PgConnection, key: i32) -> Result<()> {
    use schema::google_sessions::dsl::*;

    diesel::delete(google_sessions)
        .filter(id.eq(key))
        .execute(conn)?;
    Ok(())
}

fn upsert_discord_account(
    conn: &PgConnection,
    discord_account: models::NewDiscordAccount,
    account_id: Option<i32>,
) -> Result<String> {
    use schema::discord_accounts;

    let account_id = if let Some(account_id) = account_id {
        account_id
    } else {
        insert_account(conn)?
    };
    let discord_account = models::DiscordAccount {
        id: discord_account.id,
        username: discord_account.username,
        discriminator: discord_account.discriminator,
        avatar: discord_account.avatar,
        mfa_enabled: discord_account.mfa_enabled,
        locale: discord_account.locale,
        flags: discord_account.flags,
        premium_type: discord_account.premium_type,
        public_flags: discord_account.public_flags,
        account_id,
    };

    let account: models::DiscordAccount = diesel::insert_into(discord_accounts::table)
        .values(&discord_account)
        .on_conflict(on_constraint("discord_accounts_pkey"))
        .do_update()
        .set(&discord_account)
        .get_result(conn)?;
    Ok(account.id)
}

fn upsert_google_account(
    conn: &PgConnection,
    sub: String,
    account_id: Option<i32>,
) -> Result<String> {
    use schema::google_accounts;

    let account_id = if let Some(account_id) = account_id {
        account_id
    } else {
        insert_account(conn)?
    };
    let google_account = models::GoogleAccount {
        sub,
        account_id,
    };

    let account: models::GoogleAccount = diesel::insert_into(google_accounts::table)
        .values(&google_account)
        .on_conflict(on_constraint("google_accounts_pkey"))
        .do_update()
        .set(&google_account)
        .get_result(conn)?;
    Ok(account.sub)
}

fn insert_account(conn: &PgConnection) -> Result<i32> {
    use schema::accounts;

    let new_account = models::NewAccount { username: None };
    let account: models::Account = diesel::insert_into(accounts::table)
        .values(&new_account)
        .get_result(conn)?;
    Ok(account.id)
}

#[api_v2_errors(code = 500)]
#[derive(Debug, Error)]
pub enum DbError {
    #[error("Session expired")]
    SessionExpired,
    #[error("access_token does not match db entry")]
    AccessTokenInvalid,
    #[error("account_id does not match db entry")]
    AccountIdInvalid,
    #[error("[Diesel]: {0}")]
    Diesel(#[from] diesel::result::Error),
}

impl ResponseError for DbError {
    fn error_response(&self) -> HttpResponse {
        let res = match self {
            Self::SessionExpired
            | Self::AccessTokenInvalid
            | Self::AccountIdInvalid => HttpResponse::new(StatusCode::BAD_REQUEST),
            Self::Diesel(_) => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
        };
        res.set_body(Body::from(format!("{}", self)))
    }
}
