import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { X } from 'lucide-react'

interface TradeInterfaceProps {
  probability: number
  onClose: () => void
}

export function TradeInterface({ probability, onClose }: TradeInterfaceProps) {
  const [amount, setAmount] = useState(50)
  const [outcome, setOutcome] = useState<'Yes' | 'No'>('Yes')
  const [type, setType] = useState<'Buy' | 'Sell'>('Buy')

  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex rounded-lg overflow-hidden bg-slate-800/50">
            <Button
              variant={outcome === 'Yes' ? "default" : "ghost"}
              className={outcome === 'Yes' 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"}
              onClick={() => setOutcome('Yes')}
            >
              Yes
            </Button>
            <Button
              variant={outcome === 'No' ? "default" : "ghost"}
              className={outcome === 'No' 
                ? "bg-rose-500 hover:bg-rose-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"}
              onClick={() => setOutcome('No')}
            >
              No
            </Button>
          </div>
          <div className="flex rounded-lg overflow-hidden bg-slate-800/50">
            <Button
              variant={type === 'Buy' ? "default" : "ghost"}
              className={type === 'Buy' 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"}
              onClick={() => setType('Buy')}
            >
              Buy
            </Button>
            <Button
              variant={type === 'Sell' ? "default" : "ghost"}
              className={type === 'Sell' 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"}
              onClick={() => setType('Sell')}
            >
              Sell
            </Button>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-300 hover:bg-slate-800/70"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Trade amount</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-slate-800/50 border-slate-700 focus:border-slate-600 text-slate-200"
            />
            <div className="grid grid-cols-3 gap-1">
              {[10, 50, 250].map((value) => (
                <Button
                  key={`add${value}`}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(a => a + value)}
                  className="text-xs border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300"
                >
                  +{value}
                </Button>
              ))}
              {[10, 50, 250].map((value) => (
                <Button
                  key={`sub${value}`}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(a => Math.max(0, a - value))}
                  className="text-xs border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300"
                >
                  -{value}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Slider
          defaultValue={[50]}
          max={1000}
          step={1}
          value={[amount]}
          onValueChange={([value]) => setAmount(value)}
          className="py-4"
        />

        {/* <div className="flex justify-between text-sm">
          <span className="text-slate-400">New probability</span>
          <span className="text-slate-200">{probability}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Max payout</span>
          <span className="text-emerald-400 font-medium">₳73 +48%</span>
        </div> */}

        <Button 
          className={`w-full ${
            outcome === 'Yes' 
              ? "bg-emerald-500 hover:bg-emerald-600" 
              : "bg-rose-500 hover:bg-rose-600"
          } text-white font-medium shadow-lg`}
        >
          {type} {outcome}
        </Button>
      </div>
    </div>
  )
}