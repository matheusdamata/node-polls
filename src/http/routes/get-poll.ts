import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (req, reply) => {
    const getPollBodySchema = z.object({
      pollId: z.string().uuid()
    })
  
    const { pollId } = getPollBodySchema.parse(req.params)
  
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    })
  
    return reply.send({
      poll,
    })
  })
}