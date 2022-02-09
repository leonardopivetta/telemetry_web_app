import { Setup, TyresValues } from "../../types/Setup"
import { FunctionComponent, useEffect, useState } from "react"
import { getSetup, pushSetup } from "../../firebase/firestore"
import { Timestamp } from "firebase/firestore"
import "./style.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

/**
 * @param setup
 * @returns JSX element with the render of the top view of the car for the setup
 */

const TopView: React.FC<{ setup: Setup }> = props => {
  // Returns the text formatted by "key: value" of any key and corrisponding tyre
  const getTextFromTyre = (key: keyof TyresValues<any>) => {
    return <tspan>
      {Object.keys(props.setup).map(k => {
        if (Object.keys(props.setup[k as keyof typeof props.setup]).includes(key)) {
          return <tspan dy="1.2em" x={0}>
            {`${k}: ${(props.setup[k as keyof typeof props.setup] as TyresValues<any>)[key as keyof TyresValues<any>]}`}
          </tspan>
        } else {
          return <tspan></tspan>
        }
      })}
    </tspan>
  }
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1059 752.24"
  >
    <defs>
      <style>
        {
          ".cls-1{fill:none}.cls-1,.cls-4{stroke:#ffe14a;stroke-miterlimit:10;stroke-width:3px}.cls-2{font-size:13px;fill:#f6f6f6}.cls-3{letter-spacing:-.03em}.cls-4{fill:#3c3c3b}"
        }
      </style>
    </defs>
    <g id="Livello_2" data-name="Livello 2">
      <g id="Livello_2-2" data-name="Livello 2">
        <image
          width={5760}
          height={2412}
          transform="matrix(0 -.13 .13 0 369.72 752.24)"
          xlinkHref={require("../../assets/top_view.png")}
        />
        <path
          className="cls-1"
          d="M792.18 43.56h242.65a22.68 22.68 0 0 1 22.68 22.68v119a19.84 19.84 0 0 1-19.84 19.84H769.5V66.24a22.68 22.68 0 0 1 22.68-22.68Z"
        />
        <text className="cls-2" transform="translate(781.92 65.63)">
          {getTextFromTyre("frontRight")}
        </text>
        <path className="cls-4" d="m769.5 205.07-123.11 70.02" />
        <path
          className="cls-1"
          d="M792.18 322.92h242.65a22.68 22.68 0 0 1 22.68 22.68v116.15a22.68 22.68 0 0 1-22.68 22.68H769.5V345.6a22.68 22.68 0 0 1 22.68-22.68Z"
        />
        <text className="cls-2" transform="translate(781.92 345)">
          {getTextFromTyre("backRight")}
        </text>
        <path className="cls-4" d="m769.5 484.43-123.11 70.02" />
        <path
          className="cls-1"
          d="M1.5 43.56h265.32a22.68 22.68 0 0 1 22.68 22.68v116.15a22.68 22.68 0 0 1-22.68 22.68H24.18A22.68 22.68 0 0 1 1.5 182.39V43.56Z"
          transform="rotate(-180 145.5 124.315)"
        />
        <text className="cls-2" transform="translate(11.66 65.63)">
          {getTextFromTyre("frontLeft")}
        </text>
        <path className="cls-4" d="m289.5 205.07 123.11 70.02" />
        <path
          className="cls-1"
          d="M1.5 322.92h265.32a22.68 22.68 0 0 1 22.68 22.68v116.15a22.68 22.68 0 0 1-22.68 22.68H24.18A22.68 22.68 0 0 1 1.5 461.75V322.92Z"
          transform="rotate(-180 145.5 403.675)"
        />
        <text className="cls-2" transform="translate(11.66 345)">
          {getTextFromTyre("backLeft")}
        </text>
        <path className="cls-4" d="m289.5 484.43 123.11 70.02" />
      </g>
    </g>
  </svg>
}

/**
 * @param setup the setup to edit
 * @returns JSX element overlayed on the top view of the car for the setup
 */
const EditOverlay: FunctionComponent<{ setup: Setup }> = props => {
  // Input definitions
  type Inputs = {
    date: Date,

    camberFR: number,
    camberFL: number,
    camberBR: number,
    camberBL: number,

    toeFR: number,
    toeFL: number,
    toeBR: number,
    toeBL: number,
  }

  // Form state
  const { register, handleSubmit } = useForm<Inputs>();

  // Navigation hook
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const toPush: Setup = {
      date: Timestamp.fromDate(data.date),
      camber: {
        frontRight: data.camberFR,
        frontLeft: data.camberFL,
        backRight: data.camberBR,
        backLeft: data.camberBL,
      },
      toe: {
        frontRight: data.toeFR,
        frontLeft: data.toeFL,
        backRight: data.toeBR,
        backLeft: data.toeBL,
      },
    };
    pushSetup(toPush).then(() => {
      // Go back
      navigate(-1);
    });
  }

  return <div>
    <div className="overlay-setup">
      <div className="top-left-tyre">
        <div className="flex">
          <label htmlFor="camber-fl" className="w-1/4">Camber:</label>
          <input type="number" id="camber-fl" className="w-3/4" {...register("camberFL", { required: true, valueAsNumber: true })} defaultValue={props.setup.camber.frontLeft}></input>
        </div>
        <div className="flex">
          <label htmlFor="toe-fl" className="w-1/4">Toe:</label>
          <input type="number" id="toe-fl" className="w-3/4" {...register("toeFL", { required: true, valueAsNumber: true })} defaultValue={props.setup.toe.frontLeft}></input>
        </div>
      </div>
      <div className="top-right-tyre">
        <div className="flex">
          <label htmlFor="camber-fr" className="w-1/4">Camber:</label>
          <input type="number" id="camber-fr" className="w-3/4" {...register("camberFR", { required: true, valueAsNumber: true })} defaultValue={props.setup.camber.frontRight}></input>
        </div>
        <div className="flex">
          <label htmlFor="toe-fr" className="w-1/4">Toe:</label>
          <input type="number" id="toe-fr" className="w-3/4" {...register("toeFR", { required: true, valueAsNumber: true })} defaultValue={props.setup.toe.frontRight}></input>
        </div>
      </div>
      <div className="center-pos">
        <button onClick={handleSubmit(onSubmit)} className="rounded-3xl">Save</button>
        <div className="reset">
          <input type="date" className="text-center w-full" {...register("date", {required: true})}></input>
        </div>
      </div>
      <div className="bottom-left-tyre">
        <div className="flex">
          <label htmlFor="camber-bl" className="w-1/4">Camber:</label>
          <input type="number" id="camber-bl" className="w-3/4" {...register("camberBL", { required: true, valueAsNumber: true })} defaultValue={props.setup.camber.backLeft}></input>
        </div>
        <div className="flex">
          <label htmlFor="toe-bl" className="w-1/4">Toe:</label>
          <input type="number" id="toe-bl" className="w-3/4" {...register("toeBL", { required: true, valueAsNumber: true })} defaultValue={props.setup.toe.backLeft}></input>
        </div>
      </div>
      <div className="bottom-right-tyre">
        <div className="flex">
          <label htmlFor="camber-br" className="w-1/4">Camber:</label>
          <input type="number" id="camber-br" className="w-3/4" {...register("camberBR", { required: true, valueAsNumber: true })} defaultValue={props.setup.camber.backRight}></input>
        </div>
        <div className="flex">
          <label htmlFor="toe-br" className="w-1/4">Toe:</label>
          <input type="number" id="toe-br" className="w-3/4" {...register("toeBR", { required: true, valueAsNumber: true })} defaultValue={props.setup.toe.backRight}></input>
        </div>
      </div>
    </div>
  </div>
}

export const SetupPage: FunctionComponent<{ editable?: boolean, framed?: boolean}> = props => {
  const [setup, setSetup] = useState<Setup | undefined>(undefined);
  useEffect(() => {
    let isMounted = true;
    // Todo only debug, need to change it with a real date for the setup
    getSetup(Timestamp.fromDate(new Date())).then(set => {
      if(isMounted) setSetup(set)
    });
    return ()=>{isMounted = false}
  }, []);
  return <div className={ props.framed ? "h-full w-full" : "h-screen w-screen"}>
    <div className="w-3/4 h-2/3 mx-auto">
      {setup && <div className="relative">
        {props.editable && <EditOverlay setup={setup} />}
        <TopView setup={setup} />
      </div>
      }
    </div>
  </div>
}