import { act, fireEvent, render, screen } from '@testing-library/react';
import Amenities from './Amenities';

test('preserves the existing floor-plan zoom between pinch gestures', () => {
  jest.useFakeTimers();
  const { container, unmount } = render(<Amenities />);

  try {
    act(() => jest.advanceTimersByTime(3000));
    fireEvent.click(container.querySelector('polygon'));

    const image = screen.getByAltText('Block D-III 2 Rooms');
    const scroller = image.parentElement.parentElement;
    const touches = (distance) => [
      { clientX: 0, clientY: 0 },
      { clientX: distance, clientY: 0 },
    ];
    const scale = () => Number(image.style.transform.match(/scale\(([^)]+)\)/)[1]);

    fireEvent.touchStart(scroller, { touches: touches(100) });
    fireEvent.touchMove(scroller, { touches: touches(150) });
    expect(scale()).toBeCloseTo(1.5);
    fireEvent.touchEnd(scroller, { touches: [] });

    fireEvent.touchStart(scroller, { touches: touches(100) });
    fireEvent.touchMove(scroller, { touches: touches(110) });
    expect(scale()).toBeCloseTo(1.65);
    fireEvent.touchMove(scroller, { touches: touches(120) });
    expect(scale()).toBeCloseTo(1.8);
  } finally {
    unmount();
    jest.clearAllTimers();
    jest.useRealTimers();
  }
});
