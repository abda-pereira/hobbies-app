const config = {
  hobbies: [
    {
      id: 'music',
      title: 'Music',
      src: require('../assets/music.png')
    },
    {
      id: 'health',
      title: 'Health',
      src: require('../assets/health.png')
    },
    {
      id: 'photo',
      title: 'Photo',
      src: require('../assets/photo.png')
    },
    {
      id: 'travel',
      title: 'Travel',
      src: require('../assets/travel.png')
    },
    {
      id: 'food',
      title: 'Food',
      src: require('../assets/food.png')
    },
    {
      id: 'science',
      title: 'Science',
      src: require('../assets/science.png')
    },
    {
      id: 'sport',
      title: 'Sport',
      src: require('../assets/sport.png')
    },
    {
      id: 'game',
      title: 'Game',
      src: require('../assets/game.png')
    },
    {
      id: 'art',
      title: 'Art',
      src: require('../assets/art.png')
    },
  ],
  
  addressLine: (address, values, separator = ', ') => {
    let line = '';
    values.map(v => {
      if (address[v]) line += (!line.length ? '' : separator) + `${address[v] || ''}`
    })
    return line
  }
};

export default config;
