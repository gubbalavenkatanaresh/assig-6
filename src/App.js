import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    isClicked: false,
    clickedImage: '',
    randomIndex: Math.floor(Math.random() * 3),
    clickedId: '',
  }

  renderImages = () => (
    <ul className="images-container">
      {choicesList.map(each => {
        const clickImage = () => {
          this.setState({
            clickedImage: each.imageUrl,
            clickedId: each.id,
            isClicked: true,
            randomIndex: Math.floor(Math.random() * 3),
          })
        }
        const testId = `${each.id.toLowerCase()}Button`
        console.log(testId)
        return (
          <li key={each.id}>
            <button
              type="button"
              data-testid={testId}
              onClick={clickImage}
              className="image-btn"
            >
              {' '}
              <img src={each.imageUrl} alt={each.id} className="image" />
            </button>
          </li>
        )
      })}
    </ul>
  )

  getResult = () => {
    const {randomIndex, clickedId} = this.state
    const {id} = choicesList[randomIndex]
    if (clickedId === id) {
      return <p>IT IS DRAW</p>
    }
    switch (clickedId) {
      case 'ROCK':
        return id === 'SCISSORS' ? <p>YOU WON</p> : <p>YOU LOSE</p>
      case 'SCISSORS':
        return id === 'PAPER' ? <p>YOU WON</p> : <p>YOU LOSE</p>
      case 'PAPER':
        return id === 'ROCK' ? <p>YOU WON</p> : <p>YOU LOSE</p>

      default:
        return null
    }
  }

  increaseScore = () => {
    this.setState(prevState => ({score: prevState + 1}))
  }

  decreaseScore = () => {
    this.setState(prevState => ({score: prevState - 1}))
  }

  renderResult = () => {
    const {clickedImage, randomIndex, clickedId} = this.state
    const {id, imageUrl} = choicesList[randomIndex]
    const onClickPlayAgain = () => {
      this.setState({isClicked: false})
    }
    const resultText = this.getResult()

    console.log(resultText.props.children)
    switch (resultText.props.children) {
      case 'YOU WON':
        this.increaseScore()
        break
      case 'YOU LOSE':
        this.decreaseScore()
        break
      default:
        console.log(resultText.props.children)
        break
    }
    return (
      <div>
        <div className="result-container">
          <div>
            <h1>YOU</h1>
            <img src={clickedImage} alt="your choice" className="image" />
          </div>
          <div>
            <h1>OPPONENT</h1>
            <img src={imageUrl} alt="opponent choice" className="image" />
          </div>
        </div>
        {resultText}
        <button type="button" onClick={onClickPlayAgain} className="play-btn">
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {score, isClicked} = this.state
    return (
      <div className="container">
        <div className="score-container">
          <div className="top-headings">
            <h1>ROCK PAPER SCISSORS</h1>
          </div>
          <div className="score-card">
            <p>Score</p>
            <p>{score}</p>
          </div>
        </div>
        {isClicked ? this.renderResult() : this.renderImages()}
        <Popup
          modal
          trigger={
            <button type="button" className="rules-btn">
              RULES
            </button>
          }
        >
          {close => (
            <div className="rules-container">
              <RiCloseLine
                className="close-icon"
                onClick={() => {
                  close()
                }}
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
