const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}

function startGame() {
  //var heroName = prompt("Please enter your name", "");
  state = {}
  showTextNode(0)
  document.body.style.backgroundImage = "url(images/0.jpg"
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      button.addEventListener('click', () => changeBackground(textNode.id))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId < 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

function changeBackground(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  document.body.style.backgroundImage = "url(images/" + textNode.id + ".jpg)";
}

const textNodes = [
  {
    id: 0,
    text: 'Welcome to Brandon\'s Adventure Game! Be on your guard as treachery and danger lie ahead for you Adventurer!',
    background: document.body.style.backgroundImage = "url(images/0.jpg",
    options: [
      {
        text: 'Venture Forth',
        nextText: 1
      }
    ]
  },
  {
    id: 1,
    text: 'You find yourself in an empty chamber. The walls are made of rough stone. You see a red door to your left and a blue door to your right.',
    options: [
      {
        text: 'Go through the red door',
        //setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Go through the blue door',
        nextText: 4
      }
    ]
  },
  {
    id: 2,
    text: 'You slowly open the door. There before you stands an ancient red dragon. Its eyes lock onto you as you peer through the open door. Do you flee for your life or stay and fight?',
    options: [
      {
        text: 'Flee',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { blueGoo: false, sword: true },
        nextText: 1
      },
      {
        text: 'Fight',
        //requiredState: (currentState) => currentState.blueGoo,
        //setState: { blueGoo: false, shield: true },
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You reach toward the hilt of your sword and unsheath it. You expected a shining blade to move in front of your vision, but it appears your sword has been badly damaged. The dragon\'s maw opens wide and flames pour over the entire room. The world fades to black.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'You open the blue door and see a room with a large wooden chest on the left, and a sleeping guard on the right in front another door.',
    options: [
      {
        text: 'Investigate the wooden chest',
        nextText: 5
      },
      {
        text: 'Sneak toward the sleeping guard',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'It appears the wooden chest is filled with treasure!',
    options: [
      {
        text: 'Take the treasure',
        setState: { silverKey: true, shieldSturdy: true, swordElven: true },
        nextText: 7
      },
      {
        text: 'Leave the treasure',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'There\'s no need for riches now. I must get past this guard and escape. They\'re the only thing standing between me and escape from this place!',
    options: [
      {
        text: 'Sneak over to the sleeping guard.',
        nextText: 8
      },
      {
        text: 'Back out of the room ',
        nextText: 1
      }
    ]
  },
  {
    id: 7,
    text: 'The chest creaks open. You look over to the guard, but luckily they were not awakened by the loud creaking sound. You find a silver key, a sturdy shield, and a sword made from Elven steel. Now for the guard...',
    options: [
      {
        text: 'Sneak over to the sleeping guard.',
        nextText: 8
      },
      {
        text: 'Slowly back out of the room with your treasure.',
        nextText: 1
      }
    ]
  },
  {
    id: 8,
    text: 'You slowly approach the guard and notice they are still sleeping. You need to get to that door on the right of them. What are you waiting for?.',
    options: [
      {
        text: 'Sneak past the guard.',
        nextText: 9
      },
      {
        text: 'Attack the guard.',
        nextText: 10,
        requiredState: (currentState) => currentState.swordElven,
      },
      {
        text: 'Head back and rethink your strategy',
        nextText: 4
      }
    ]
  },
  {
    id: 9,
    text: 'You slowly creep past the sleeping guard. You reach for the door behind them and open it slowly. The door makes a loud creak echoing throughout the chamber. Just as the door is wide enough for you to slip through, you feel the cold steel of a blade at your back. The world fades to black.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You approach the sleeping guard and unsheath your Elven steel sword. The sound is loud enough to wake the guard, but you have the drop on them. You bury the Elven sword through the chain shirt worn by the guard, and they slump back in their chair.',
    options: [
      {
        text: 'Move to the door they were guarding',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You rush over to the previously guarded door eager to be free of this place. The door is locked. There must be a way to open it.',
    options: [
      {
        text: 'Use the Silver Key.',
        requiredState: (currentState) => currentState.silverKey,
        nextText: 12
      },
      // {
      //   text: 'My adventure isn\'t quite finished. I have a dragon to slay.',
      //   nextText: 2
      // },
    ]
  },
  {
    id: 12,
    text: 'You put the Silver Key into the lock. It fits! You slowly turn the key and feel the heavy door lurch inward. You pull the door open and feel the warm sun on your face. You\'re finally free of this place!',
    options: [
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  }
]

startGame()