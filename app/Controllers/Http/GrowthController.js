'use strict'

class GrowthController {
    async create ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // Save Growth to database
        const growth = await Growth.create({
            owner_id: user.id,
            grower_id: request.input('grower_id'),
            strain_id: request.input('strain_id'),
            notes: request.input('notes'),
            status: request.input('status')
        })
    
        // fetch Growth's relations
        await growth.loadMany(['user', 'strain'])
    
        return response.json({
            status: 'success',
            message: 'Growth created!',
            data: growth
        })
    }

    async show ({ params, response }) {
        try {
            const growth = await Growth.query()
                .where('id', params.id)
                .with('user')
                .with('strain')
                .firstOrFail()
    
            return response.json({
                status: 'success',
                data: growth
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Growth not found'
            })
        }
    }

    async strain ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get growth with the specified ID
        const growth = await Growth.find(params.id)
    
        // persist to database
        const strain_id = await Reply.create({
            user_id: user.id,
            growth_id: growth.id,
            strain: request.input('strain_id')
        })
    
        // fetch user that made the strain_id
        await strain_id.load('user')
    
        return response.json({
            status: 'success',
            message: 'Reply growthed!',
            data: reply
        })
    }

    async destroy ({ auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get growth with the specified ID
        const growth = await Growth.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()
    
        await growth.delete()
    
        return response.json({
            status: 'success',
            message: 'Growth deleted!',
            data: null
        })
    }
}

module.exports = GrowthController
