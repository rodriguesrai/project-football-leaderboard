const validEmail = 'user@user.com';
const invalidPassword = '12345';
const emailNotInDatabase = 'xablau@user.com';
const validPassword = '123456';

export const loginSuccess = {
  token: 'token',
};

export const loginData = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

export const admin = {
  validAdmin: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  invalidAdmin: {
    id: 1,
    username: 'Admin',
    role: 'undefined',
    email: 'admin@xablau.com',
    password: 'senha_invalida',
  },
}

export const ResponseInvalidFields ={
  message: 'All fields must be filled'
}

export const userValidBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

export const emailInvalidBody = {
    email: '@user.com',
    password: 'secret_user'
  }

export const passwordInvalidBody = {
  email: validEmail,
  password: invalidPassword
}

export const emailNotInDatabaseBody = {
  email: emailNotInDatabase,
  password: validPassword
}

export const passwordNotInDatabaseBody = {
  email: admin.validAdmin.email,
  password: admin.invalidAdmin.password
}
