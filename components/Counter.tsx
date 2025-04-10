'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { decrement, increment } from '@/app/features/counter/counterSlice';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-4">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
    </div>
  );
}
