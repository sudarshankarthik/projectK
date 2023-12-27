export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
          text: {
            main: '#050505',
          },
          background: {
            main: '#fafafa',
          },
          primary: {
            main: '#85CB33',
          },
          secondary: {
            main: '#ede9de',
          },
          accent: {
            main: '#124300',
          }
        }
        : {
          text: {
            primary: '#fafafa',
          },
          background: {
            default: '#050505',
          },
          primary: {
            main: '#85CB33',

          },
          secondary: {
            main: '#ede9de',
          },
          accent: {
            main: '#3bdc00',
          }

        }),
    },
    typography: {
      fontFamily: ['Hanuman', 'serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Hanuman', 'serif'].join(','),
        fontSize: 14,
      },
    },
  };
};