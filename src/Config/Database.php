<?php

namespace MiniBanking\Config;

use mysqli;

class Database
{
    private static ?mysqli $connection = null;
    
    public static function getConnection(): mysqli
    {
        if (self::$connection === null) {
            // Configurazione per XAMPP
            self::$connection = new mysqli(
                'localhost',     // host
                'root',          // username
                '',              // password (vuota su XAMPP)
                'banking'        // database name
            );
            
            if (self::$connection->connect_error) {
                die("Connection failed: " . self::$connection->connect_error);
            }
            
            // Set charset
            self::$connection->set_charset("utf8");
        }
        
        return self::$connection;
    }
}