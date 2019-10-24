import React from "react";

let withSuspense = Component => {
    return () => {
      return (
          <React.Suspense fallback={<div>Загрузка...</div>}>
              <Component/>
          </React.Suspense>
      );
  };
};

export default withSuspense;
