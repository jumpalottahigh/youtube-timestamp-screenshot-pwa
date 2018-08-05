import React from 'react'

import axios from 'axios'

import loader from '../images/loader.gif'

const CONFIG = {
  DEBUG_URL: 'http://localhost:8080/?url=',
  APP_URL: 'https://youtube-timestamp-screenshot.herokuapp.com/?url=',
}

export default class Main extends React.Component {
  state = {
    loading: false,
    imageData: null,
    statusMessage: '',
    statusResult: null,
  }

  getBase64 = url => {
    return axios
      .get(url, {
        responseType: 'blob',
      })
      .then(response => {
        let reader = new window.FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = () => {
          let imageDataUrl = reader.result

          // Update UI
          this.setState({
            imageData: imageDataUrl,
            loading: false,
            statusMessage: 'Click the image to download!',
            statusResult: 'alert-success',
          })

          // Send analytics success
          this.sendGAEvent('fetch submit', 'fetch', 'fetch success')

          return true
        }
      })
      .catch(e => {
        // Update the UI
        this.setState({
          imageData: null,
          loading: false,
          statusMessage:
            'Something went wrong! Please enter a valid URL. See the example above!',
          statusResult: 'alert-danger',
        })

        // Send analytics error
        this.sendGAEvent('fetch submit', 'fetch', 'fetch failed' + e)
      })
  }

  // Send GA custom event
  sendGAEvent = (eventAction, eventCategory, eventLabel) => {
    window.ga('send', 'event', {
      eventAction,
      eventCategory,
      eventLabel,
    })
  }

  // Handle form submit
  handleSubmit = e => {
    // Prevent default submit
    e.preventDefault()

    // Fetch the screenshot
    let { value } = e.target[0]
    let URL = `${CONFIG.DEBUG_URL}${value}`
    this.getBase64(URL)

    // Update the UI
    this.setState({ loading: true })

    // Send submit analytics event
    this.sendGAEvent('fetch submit', 'fetch', 'fetch init')
  }

  // Handle image click
  handleImageClick = () => {
    this.sendGAEvent('download click', 'download', 'click')
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <form onSubmit={this.handleSubmit}>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter video URL including timestamp"
                />
                <p className="mt-3">
                  For exmaple:
                  <br />
                  <strong>
                    https://www.youtube.com/watch?v=70tXXAfs-ks&t=4m5s
                  </strong>
                  <br /> will take a screenshot of the video at 4 minutes and 5
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
              {this.state.statusMessage &&
                this.state.statusResult && (
                  <p
                    className={`alert ${this.state.statusResult}`}
                    role="alert"
                  >
                    {this.state.statusMessage}
                  </p>
                )}
              <a
                href={this.state.imageData ? this.state.imageData : '#download'}
                onClick={this.handleImageClick}
                download
              >
                {this.state.loading && (
                  <img src={loader} alt="loading spinner" />
                )}
                {this.state.imageData && (
                  <img
                    alt="screenshot holder"
                    style={{ maxWidth: '100%' }}
                    src={this.state.imageData}
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
