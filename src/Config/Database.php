<?php

namespace MiniBanking\Config;

use mysqli;

class Database
{
    private static ?mysqli $connection = null;
    
    public static function getConnection(): mysqli
    {
        if (self::$connection === null) {
            self::$connection = new mysqli(
                'localhost',
                'root',     
                '',         
                'banking'   
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