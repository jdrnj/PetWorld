import { UserProvider } from "./context/UserContext";
import AppWrapper from "./AppWrapper.js";
function App() {
  return (
    <UserProvider>
      <AppWrapper />
    </UserProvider>
  );
}

export default App;
