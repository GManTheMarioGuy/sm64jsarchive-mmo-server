use crate::Rooms;

use anyhow::Result;
use rayon::prelude::*;
use std::{thread, time::Duration};

pub struct Game;

impl Game {
    pub fn run(rooms: Rooms) {
        thread::spawn(move || {
            let mut i = 0;
            loop {
                i += 1;
                Self::process_flags(rooms.clone());
                Self::broadcast_data(rooms.clone()).unwrap();
                if i == 30 {
                    Self::broadcast_skins(rooms.clone()).unwrap();
                    i = 0;
                }
                thread::sleep(Duration::from_millis(33));
            }
        });
    }

    pub fn process_flags(rooms: Rooms) {
        rooms.par_iter().for_each(|room| room.process_flags());
    }

    pub fn broadcast_data(rooms: Rooms) -> Result<()> {
        if let Err(err) = rooms
            .par_iter()
            .map(|room| room.broadcast_data())
            .collect::<Result<Vec<_>>>()
        {
            eprintln!("{:?}", err);
        }
        Ok(())
    }

    pub fn broadcast_skins(rooms: Rooms) -> Result<()> {
        if let Err(err) = rooms
            .par_iter()
            .map(|room| room.broadcast_skins())
            .collect::<Result<Vec<_>>>()
        {
            eprintln!("{:?}", err);
        }
        Ok(())
    }
}