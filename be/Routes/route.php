<?php
const ROUTES = [
    'GET' => [
        [
            'path' => '/image',
            'controller' => 'MainController',
            'method' => 'getRandomImageId'
        ],
        [
            'path' => '/viewer',
            'controller' => 'MainController',
            'method' => 'getTotalViewers'
        ]
    ],
    'POST' => [
        [
            'path' => '/increase',
            'controller' => 'MainController',
            'method' => 'increaseViewer'
        ]
    ]
];
