export default () => [
  {
    fileName: 'overmind/actions.test.ts',
    code: `
import { createMock } from 'overmind'
import { config } from './'

describe('Actions', () => {
  describe('getPost', () => {
    test('should get post with passed id', async () => {
      const mock = createMock(config, {
        api: {
          getPost(id) {
            return Promise.resolve({
              id
            })
          }
        }
      })

      await actions.getPost('1')

      expect(mock.state).toEqual({
        isLoadingPost: false,
        currentPost: { id: '1' },
        error: null
      })
    })
    test('should handle errors', async () => {
      const mock = createMock(config, {
        api = {
          getPost() {
            throw new Error('test')
          }
        }
      })

      await actions.getPost('1')

      expect(mock.state.isLoadingPost).toBe(false)
      expect(mock.state.error.message).toBe('test')
    })
  })
})
    `,
  },
]