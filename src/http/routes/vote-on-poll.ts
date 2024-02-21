import z from "zod"
import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (req, reply) => {
    const voteOnPollBodySchema = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParamsSchema = z.object({
      pollId: z.string().uuid(),
    })
  
    const { pollId } = voteOnPollParamsSchema.parse(req.params)
    const { pollOptionId } = voteOnPollBodySchema.parse(req.body)

    let { sessionId } = req.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            pollId,
            sessionId
          }
        }
      })

      if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id
          }
        })
      } else if (userPreviousVoteOnPoll) {
        return reply.status(400).send({
          message: 'You already voted on this poll.'
        })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    })

    return reply.status(201).send()
  })
}