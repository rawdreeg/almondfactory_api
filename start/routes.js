'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Feisty one you are!' }
})

//auth routes
Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')


Route.group(() => {
    Route.get('/me', 'UserController.me')
    Route.put('/update_profile', 'UserController.updateProfile')
    Route.put('/change_password', 'UserController.changePassword')
  })
    .prefix('account')
    .middleware(['auth:jwt'])

//growths
Route.post('/growths', 'GrowthController.post').middleware(['auth:jwt'])
Route.get('/growths/:id', 'GrowthController.show')
Route.post('/growths/strain/:id', 'GrowthController.strain').middleware(['auth:jwt']);
Route.delete('/growths/destroy/:id', 'GrowthController.destroy').middleware(['auth:jwt'])


//strains
Route.group(() => {
  Route.get('/get/all', 'StrainController.showAll')
  Route.get('/get/:id', 'StrainController.show')
})
  .prefix('strains')
  .middleware(['auth:jwt'])

// profile
Route.get(':username', 'UserController.showProfile')