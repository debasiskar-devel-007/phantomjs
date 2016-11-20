<?php
/**
 * Created by PhpStorm.
 * User: debasis
 * Date: 19/11/16
 * Time: 11:55 PM
 */
error_reporting(E_ALL);
//echo 67;

$path = getcwd();
//echo "This Is Your Absolute Path: ";
//echo $path;

$response = exec('/home/influxiq/public_html/projects/phantom/ph/bin/phantomjs /home/influxiq/public_html/projects/phantom/ph/examples/test.js http://www.ripoffreport.com/');
//$response = exec('ls ');

print_r($response);
//echo 98;
?>