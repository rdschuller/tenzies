

export default function Die(props) {
    return (
        <div className={`${props.isHeld ? 'bg-green-500' : 'bg-white'} w-20 h-20 rounded-lg shadow-md flex items-center justify-center cursor-pointer`}
            onClick={() => props.holdDice(props.id)}
        >
            <h1 className="text-custom-1 text-center text-lg font-extrabold">{props.value}</h1>
        </div>
    )
  }