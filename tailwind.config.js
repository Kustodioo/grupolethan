module.exports = {
    theme: {
      extend: {
        colors: {
          primary: '#00CFFF',
          secondary: '#FFC300',
          success: '#1ABC9C',
          warning: '#FF5733',
          info: '#8E44AD',
          dark: '#333333',
          light: '#DDDDDD',
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          'xl': '1.5rem',
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        borderColor: ['focus'],
        textColor: ['visited'],
      },
    },
    plugins: [],
  };
  