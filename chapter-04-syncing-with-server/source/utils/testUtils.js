import fetchMock from 'fetch-mock';

export const testErrorRejection = ({ path, method = 'GET', equal, func }) => {
  const codes = [
    { status: 300, text: 'Multiple Choices' },
    { status: 400, text: 'Bad Request' },
    { status: 500, text: 'Internal Server Error' },
  ];

  return codes.reduce((p, { status, text }) => (
    p.then(() => {
      fetchMock.reMock(path, method, { status });
      return func()
        .catch((error) => {
          equal(error.message, text);
        });
    })
  ), Promise.resolve());
};
