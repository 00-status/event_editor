<?php

require __DIR__ . '/vendor/autoload.php';

use NarrativeEditor\Domain\Choice;
use NarrativeEditor\Domain\Part;
use NarrativeEditor\Services\DeletePartService;
use NarrativeEditor\Services\ReadEventService;
use NarrativeEditor\Services\WriteChoicesService;
use NarrativeEditor\Services\WritePartsService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

const TEMPLATE_PATH = './templates';

$app = AppFactory::create();

// Add Middleware
$twig = Twig::create(TEMPLATE_PATH, ['cache' => false]);
$app->add(TwigMiddleware::create($app, $twig));

// Routing
$app->redirect('/index','/');
$app->redirect('/home','/');
$app->get('/', function (Request $request, Response $response, $args) {
    $view = Twig::fromRequest($request);
    return $view->render($response, 'landing.html', $args);
});

// API Calls
$app->get('/api/1/narrative_events', function (Request $request, Response $response, $args)
{
    $service = new ReadEventService();
    $result = $service->readData();
    $response->getBody()->write(json_encode($result));
    return $response;
});
$app->post('/api/1/parts', function (Request $request, Response $response, $args) {
    $incoming_parts = json_decode($request->getBody(), true);

    $parts = array_map(fn(array $part) => Part::fromArray($part), $incoming_parts);

    $service = new WritePartsService();
    $service->writeParts($parts);

    $response->getBody()->write(json_encode(['code' => 200]));
    return $response;
});
$app->delete('/api/1/part', function (Request $request, Response $response, $args) {
    $incoming_part = json_decode($request->getBody(), true);

    $part = Part::fromArray($incoming_part);

    $service = new DeletePartService();
    $service->deletePart($part);

    $response->getBody()->write(json_encode(['code' => 200]));
    return $response;
});
$app->post('/api/1/choices', function (Request $request, Response $response, $args) {
    $incoming_choices = json_decode($request->getBody(), true);

    $choices = array_map(fn(array $choice) => Choice::fromArray($choice), $incoming_choices);

    $service = new WriteChoicesService();
    $service->writeChoices($choices);
    $response->getBody()->write(json_encode(['code' => 200]));
    return $response;
});

$app->run();
