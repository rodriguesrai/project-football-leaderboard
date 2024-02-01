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

export const ResponseInvalidFields ={
  message: 'All fields must be filled'
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

export const userValidBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}