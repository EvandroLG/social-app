import {test, expect} from '@jest/globals'
import {editorJsonToText} from '../TextInput.web'
import {JSONContent} from '@tiptap/core'

test('converts editor JSON to text', () => {
  const data: JSONContent = {
    type: 'doc',
    attrs: {
      documentId: '123456',
      author: 'John Doe',
      createdAt: '2024-02-04T12:00:00Z',
    },
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is a sample document.',
          },
          {
            type: 'hardBreak',
          },
          {
            type: 'text',
            text: 'A new line after the hard break.',
          },
          {
            type: 'text',
            text: ' Here is a ',
          },
          {
            type: 'mention',
            attrs: {
              id: 'user123',
              name: 'Alice',
            },
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Some formatted text with ',
          },
          {
            type: 'text',
            text: 'bold',
            marks: [{type: 'bold'}],
          },
          {
            type: 'text',
            text: ' and ',
          },
          {
            type: 'text',
            text: 'italic',
            marks: [{type: 'italic'}],
          },
          {
            type: 'text',
            text: ' styles.',
          },
        ],
      },
    ],
  }

  const result = editorJsonToText(data)
  expect(result).toBe(
    [
      'This is a sample document.\n',
      'A new line after the hard break. Here is a @user123.\n',
      'Some formatted text with bold and italic styles.',
    ].join(''),
  )
})
