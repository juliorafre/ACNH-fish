'use client';

import { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    // Dynamically import paper only on client side
    import('paper').then((paperModule) => {
      const paper = paperModule.default;

      // Setup paper with canvas
      paper.setup(canvasRef.current);

      // Code ported from http://the389.com/9/1/
      const values = {
        friction: 0.8,
        timeStep: 0.01,
        amount: 15,
        mass: 2,
        count: 0
      };
      values.invMass = 1 / values.mass;

      let path, springs;
      let size = paper.view.size.multiply([1.2, 1]);

      const Spring = function(a, b, strength, restLength) {
        this.a = a;
        this.b = b;
        this.restLength = restLength || 80;
        this.strength = strength ? strength : 0.55;
        this.mamb = values.invMass * values.invMass;
      };

      Spring.prototype.update = function() {
        const delta = this.b.subtract(this.a);
        const dist = delta.length;
        const normDistStrength = (dist - this.restLength) /
                (dist * this.mamb) * this.strength;
        const deltaY = delta.y * normDistStrength * values.invMass * 0.2;
        if (!this.a.fixed)
            this.a.y += deltaY;
        if (!this.b.fixed)
            this.b.y -= deltaY;
      };

      function createPath(strength) {
        const newPath = new paper.Path({
          fillColor: 'black'
        });
        springs = [];
        for (let i = 0; i <= values.amount; i++) {
          const segment = newPath.add(new paper.Point(i / values.amount, 0.5).multiply(size));
          const point = segment.point;
          if (i === 0 || i === values.amount)
              point.y += size.height;
          point.px = point.x;
          point.py = point.y;
          // The first two and last two points are fixed:
          point.fixed = i < 2 || i > values.amount - 2;
          if (i > 0) {
              const spring = new Spring(segment.previous.point, point, strength);
              springs.push(spring);
          }
        }
        newPath.position.x -= size.width / 4;
        return newPath;
      }

      function onResize() {
        if (path)
            path.remove();
        size = paper.view.bounds.size.multiply([2, 1]);
        path = createPath(0.1);
      }

      function onMouseMove(event) {
        const location = path.getNearestLocation(event.point);
        const segment = location.segment;
        const point = segment.point;

        if (!point.fixed && location.distance < size.height / 4) {
            const y = event.point.y;
            point.y += (y - point.y) / 6;
            if (segment.previous && !segment.previous.point.fixed) {
                const previous = segment.previous.point;
                previous.y += (y - previous.y) / 24;
            }
            if (segment.next && !segment.next.point.fixed) {
                const next = segment.next.point;
                next.y += (y - next.y) / 24;
            }
        }
      }

      function updateWave(wavePath) {
        const force = 1 - values.friction * values.timeStep * values.timeStep;
        for (let i = 0, l = wavePath.segments.length; i < l; i++) {
            const point = wavePath.segments[i].point;
            const dy = (point.y - point.py) * force;
            point.py = point.y;
            point.y = Math.max(point.y + dy, 0);
        }

        for (let j = 0, l = springs.length; j < l; j++) {
            springs[j].update();
        }
        wavePath.smooth({ type: 'continuous' });
      }

      // Initialize
      onResize();

      // Event handlers
      paper.view.onResize = onResize;
      paper.view.onMouseMove = onMouseMove;
      paper.view.onFrame = function(event) {
        updateWave(path);
      };

      // Cleanup
      return () => {
        if (path) path.remove();
        paper.view.onResize = null;
        paper.view.onMouseMove = null;
        paper.view.onFrame = null;
      };
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default WaveBackground;
