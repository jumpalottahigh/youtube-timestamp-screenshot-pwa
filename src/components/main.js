import React from 'react'

import axios from 'axios'

export default class Main extends React.Component {
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data
      console.log(persons)
      // this.setState({ persons });
    })
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <form action="#" method="POST">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter video URL including timestamp"
                />
                <p className="mt-3">
                  For exmaple:
                  <br />
                  <strong>
                    https://www.youtube.com/watch?v=70tXXAfs-ks&t=4m7s
                  </strong>
                  <br /> will take a screenshot of the video at 4 minutes and 7
                  seconds in.
                </p>
                <div className="text-center">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Fetch"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="col">
              <p
                id="status"
                className="alert alert-danger"
                role="alert"
                style={{ display: 'none' }}
              />
              <a id="screenshot-link" href="#download" download>
                <img
                  id="screenshot"
                  alt="screenshot holder"
                  style={{ display: 'none', maxWidth: '100%' }}
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
