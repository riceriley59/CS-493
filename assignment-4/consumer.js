require('dotenv').config()

const amqp = require('amqplib')

const jimp = require('jimp')

const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'
const rabbitmqUrl = `amqp://${rabbitmqHost}`

const { getPhotoById, updatePhotoById } = require('./models/photo')
const { connectToDb } = require('./lib/mongo')

async function main() {
  try{
    await connectToDb() 

    const connection = await amqp.connect(rabbitmqUrl)
    const channel = await connection.createChannel()

    await channel.assertQueue('images')
    
    channel.consume('images', async message => {
      if (message) {
        const id = message.content.toString()

        console.log(`Creating thumbnail for ${id}...`)
        
        let image = await getPhotoById(id)

        const filenameNoExt = image.filename.replace(/\.[^/.]+$/, "")          
        const filename = `${filenameNoExt}.jpg`

        let thumbPath = `${__dirname}/thumbnails/${filename}`

        jimp.read(image.path, (err, thumbnail) => {
          if (err) throw err

          thumbnail.resize(100, 100).write(thumbPath)
        })

        const result = await updatePhotoById(id, { ...image, thumbPath: thumbPath, thumbUrl: `/media/thumbs/${filename}` })

        console.log(`Thumbnail generated for ${id}!`)
      }

      channel.ack(message)
    })
  } catch (err) {
    console.error(err)
  }
}

main()
