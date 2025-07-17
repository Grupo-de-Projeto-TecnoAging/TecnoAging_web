import { getServerSession } from 'next-auth'

export async function getSession(
  authOptions,
  req,
  res,
) {
  const skip = process.env.DEV_SKIP_AUTH === 'true' && process.env.NODE_ENV === 'development'

  if (skip) {
    return {
      user: {
        id: 'dev',
        name: 'Dev User',
        email: 'dev@example.com',
        role: 'Pesquisador',
      },
      expires: '9999-12-31T23:59:59.999Z',
    }
  }

  return getServerSession(req, res, authOptions)
}