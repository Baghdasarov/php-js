<?php

if (!function_exists('request_get')) {
    function request_get($field): string
    {
        return htmlspecialchars($_GET[$field]);
    }
}

if (!function_exists('request_post')) {
    function request_post($field): string
    {
        return htmlspecialchars($_POST[$field]);
    }
}
