// TODO: Type this sh*t !!

export const withBasicProvider = (Provider) => (WrappedComponent) =>
  function Result(props) {
    return (
      <Provider>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

export const withBasicProviders =
  (...providers) =>
  (WrappedComponent) =>
  (props) =>
    providers.reduceRight(
      (acc, Provider) => {
        return <Provider>{acc}</Provider>;
      },
      <WrappedComponent {...props} />
    );

export const withProviders =
  (...providers) =>
  (WrappedComponent) =>
  (props) =>
    providers.reduceRight(
      (acc, provider) => {
        let Provider = provider;
        if (Array.isArray(provider)) {
          Provider = provider[0];
          return <Provider {...provider[1]}>{acc}</Provider>;
        }

        return <Provider>{acc}</Provider>;
      },
      <WrappedComponent {...props} />
    );
