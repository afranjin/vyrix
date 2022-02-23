const axios = {
  get: jest.fn((data) => Promise.resolve({ data: data })),
  delete: jest.fn((id) => Promise.resolve({ id: id })),
  put: jest.fn((payload) => Promise.resolve({ payload })),
  patch: jest.fn((payload) => Promise.resolve({ payload })),
  post: jest.fn((payload) => Promise.resolve({ payload })),
  create: () => ({
    get: jest.fn((data) => Promise.resolve({ data: data })),
    delete: jest.fn((id) => Promise.resolve({ id: id })),
    put: jest.fn((payload) => Promise.resolve({ payload })),
    patch: jest.fn((payload) => Promise.resolve({ payload })),
    post: jest.fn((payload) => Promise.resolve({ payload })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }),
};
export default axios;
