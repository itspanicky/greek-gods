import React from "react";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={GodsList} />
    </div>
  );
};

export default App;
