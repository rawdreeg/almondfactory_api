'use strict'

const Strain = use('App/Models/Strain')

class StrainController {

    async show ({ params, response }) {
        try {
            const strain = await Strain.query()
                .where('id', params.id)
                .firstOrFail()
    
            return response.json({
                status: 'success',
                data: strain
            })
        } catch (error) {
            console.log(error)
            return response.status(404).json({
                status: 'error',
                message: 'Strain not found'
            })
        }
    }


    async showAll ({ params, response }) {
        try {
            const strains = await Strain.all()
    
            return response.json({
                status: 'success',
                data: strains
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'No strain found'
            })
        }
    }

}

module.exports = StrainController
