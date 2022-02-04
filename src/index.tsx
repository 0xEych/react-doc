import React, { useEffect, useState, VFC } from "react";
import ReactDOM from "react-dom";
import Mock from "./mock";

const Clock: VFC = () => {
  const [state, setState] = useState({ date: new Date() });
  useEffect(() => {
    setInterval(() => {
      setState({ date: new Date() });
    }, 1000);
  });
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {state.date.toLocaleTimeString()}.</h2>
    </div>
  );
};

const Form: VFC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("You clicked submit.");
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
};

const Toggle: VFC = () => {
  const [state, setState] = useState({ isToggleOn: true });
  const handleClick = () => {
    setState((prev) => ({
      isToggleOn: !prev.isToggleOn,
    }));
  };
  return (
    <button onClick={handleClick}>{state.isToggleOn ? "ON" : "OFF"}</button>
  );
};

const NameForm: VFC = () => {
  const [state, setState] = useState({ value: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ value: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert("A name was submitted: " + state.value);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={state.value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

const EssayForm: VFC = () => {
  const [state, setState] = useState({
    value: "Please write an essay about your favorite DOM element.",
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ value: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert("An essay was submitted: " + state.value);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Essay:
        <textarea value={state.value} onChange={handleChange}></textarea>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

const FlavorForm: VFC = () => {
  const [state, setState] = useState({ options: ["coconut"] });
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      options: Array.from(e.target.selectedOptions, (option) => option.value),
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let alertTexts = "";
    for (let i = 0; i < state.options.length; i++) {
      alertTexts += state.options[i] + ", ";
    }
    alertTexts = alertTexts.slice(0, -2);
    alert("Your favorite flavors are: " + alertTexts);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite flavor:
        <select multiple={true} value={state.options} onChange={handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

// const Reservation: VFC = () => {
//   type valueOf<T> = T[keyof T];
//   const initialState = {
//     isGoing: true,
//     numberOfGuest: 2,
//     add: "STRING",
//   };
//   const [state, setState] =
//     useState<Record<string, valueOf<typeof initialState>>>(initialState);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const target = e.target;
//     const value =
//       target.type === "checkbox" ? target.checked : parseInt(target.value);
//     const name = target.name;
//     console.log(target);
//     console.log(target.type);
//     console.log(target.checked);
//     console.log(target.value);
//     console.log(value);
//     console.log({
//       [name]: value,
//     });
//     setState({
//       [name]: value,
//     });
//   };

//   return (
//     <form>
//       <label>
//         Is going:
//         <input
//           name="isGoing"
//           type="checkbox"
//           checked={state.isGoing}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Number of guest:{state.add}
//         <input
//           name="numberOfGuest"
//           type="number"
//           value={state.value}
//           onChange={handleInputChange}
//         />
//       </label>
//     </form>
//   );
// };

const BoilingVerdict: VFC<{ celsius: number }> = ({ celsius }) => {
  return celsius >= 100 ? (
    <p>The water would boil.</p>
  ) : (
    <p>The water would not boil.</p>
  );
};
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
} as const;
const toCelsius = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};
const toFahrenheit = (celsius: number) => {
  return (celsius * 9) / 5 + 32;
};
const tryConvert = (
  temperature: string,
  convert: (input: number) => number
) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return "";
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};
const TemperatureInput: VFC<{
  scale: keyof typeof scaleNames;
  temperature: number | string;
  onTemperatureChange: (temperatue: string) => void;
}> = ({ scale, temperature, onTemperatureChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTemperatureChange(e.target.value);
  };
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
};
const Calculator: VFC = () => {
  const [state, setState] = useState({ temperature: "", scale: "c" });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ temperature: e.target.value });
  // };
  const handleCelsiusChange = (temperature: string) => {
    setState({ scale: "c", temperature: temperature });
  };
  const handleFahrenheitChange = (temperature: string) => {
    setState({ scale: "c", temperature });
  };
  const celsius =
    state.scale === "f"
      ? tryConvert(state.temperature, toCelsius)
      : state.temperature;
  const fahrenheit =
    state.scale === "c"
      ? tryConvert(state.temperature, toFahrenheit)
      : state.temperature;
  return (
    <>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </>
  );
};

const App: VFC = () => {
  return (
    <>
      <Clock />
      <Form />
      <Toggle />
      <NameForm />
      <EssayForm />
      <FlavorForm />
      {/* <Reservation /> */}
      <Calculator />
      <Mock />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
