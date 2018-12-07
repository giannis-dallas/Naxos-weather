<?php

/*
Plugin Name: Naxos Weather React App 
Plugin URI:  http://link to your plugin homepage
Description: Yahoo Weather React app for Wordpress
Version:     1.1.2
Author:      Giannis Dallas
Author URI:  https://giannisdallas.com
License:     GPL2 etc
License URI: 
*/

//[foobar]
function WP_Create_React_App_func(){
	return "<div id='NaxosreactApp'></div>";
}
add_shortcode( 'Naxos_Weather', 'WP_Create_React_App_func' );

function reactapp_enqueue_scripts() {

	wp_enqueue_script( 'custom-react-app', plugin_dir_url( __FILE__ ) . '/app/dist/index.bundle.js', array(), '', true ); 
	wp_enqueue_style( 'custom-react-app-style', plugin_dir_url( __FILE__ ) . '/app/dist/index.bundle.css','');
}

add_action( 'wp_enqueue_scripts', 'reactapp_enqueue_scripts' );