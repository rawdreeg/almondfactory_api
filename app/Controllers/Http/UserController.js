'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
    
    async signup ({ request, auth, response }) {
        // get user data from signup form
        const userData = request.only(['username', 'email', 'phone', 'password', "type"])

        try {
            // save user to database
            const user = await User.create(userData)
            // generate JWT token for user
            const token = await auth.generate(user)

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.'
            })
        }
    }

    async login ({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            console.log(error)
            response.status(400).json({
                status: 'error',
                message: 'Invalid email/password'
            })
        }
    }

    async me ({ auth, response }) {
        const user = await User.query()
            .where('id', auth.current.user.id)
            .with('growths', builder => {
                builder.with('user')
                builder.with('strains')
            })
            .firstOrFail()
    
        return response.json({
            status: 'success',
            data: user
        })
    }

    async updateProfile ({ request, auth, response }) {
        try {
            // get currently authenticated user
            const user = auth.current.user
    
            // update with new data entered
            user.username = request.input('username')
            user.email = request.input('email')
            user.phone = request.input('phone')
    
            await user.save()
    
            return response.json({
                status: 'success',
                message: 'Profile updated!',
                data: user
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem updating profile, please try again later.'
            })
        }
    }

    async changePassword ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // verify if current password matches
        const verifyPassword = await Hash.verify(
            request.input('password'),
            user.password
        )
    
        // display appropriate message
        if (!verifyPassword) {
            return response.status(400).json({
                status: 'error',
                message: 'Current password could not be verified! Please try again.'
            })
        }
    
        // hash and save new password
        user.password = await Hash.make(request.input('newPassword'))
        await user.save()
    
        return response.json({
            status: 'success',
            message: 'Password updated!'
        })
    }

    async showProfile ({ params, response }) {
        try {
            const user = await User.query()
                .where('username', params.username)
                .with('growth', builder => {
                    builder.with('user')
                    builder.with('strains')
                })
                .firstOrFail()
    
            return response.json({
                status: 'success',
                data: user
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }
    }

}

module.exports = UserController