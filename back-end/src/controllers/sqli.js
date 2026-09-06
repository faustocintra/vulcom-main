import prisma from '../database/client.js'

const controller = {}

controller.login = async function(req, res) {
  const username = req.body?.username ?? ''
  const password = req.body?.password ?? ''

  // DESAFIO: esta concatenação é intencionalmente vulnerável a SQL Injection.
  // Não reutilizar este padrão em código de produção.
  const query = `SELECT * FROM "User" WHERE username = '${username}' AND password = '${password}'`

  console.log('****** INSECURE SQL:', query)

  try {
    const users = await prisma.$queryRawUnsafe(query)

    if(users.length > 0) {
      return res.send({
        success: true,
        message: `Bem-vindo, ${username}!`,
        flag: 'VULCOM{SQLi_Exploit_Success}',
        result: users,
        query
      })
    }

    res.status(401).send({
      success: false,
      message: 'Login falhou!',
      result: users,
      query
    })
  }
  catch(error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: 'Erro no servidor',
      query
    })
  }
}

export default controller
