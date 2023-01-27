import AuthProvider from "../contexts/AuthContext";
import KeyPad from "./user/KeyPad";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <KeyPad />
      </AuthProvider>
    </div>
  );
}

export default App;
