// We force cast the envvar to string because
// it is more convenient for consumer.
// Note that the envvar must start with
// REACT_APP_ as documented in CRA documentation.
export const MY_API_SERVER_API_KEY = process.env
  .REACT_APP_MY_API_SERVER_API_KEY as string;
