import anime from "animejs";

anime({
  targets: 'div',
  translateX: 450,
  translateY: -100,
  rotate: '1turn',
  backgroundColor: '#913',
  color: "#f3f3f3",
  duration: 1500,
  scale: () => 2.5,
  loop: true,
  direction: 'alternate',
  borderRadius: () => '8%',
  roteate: () => anime.random(-360, 360),
  easing: 'easeOutElastic(1, 0.5)',
});

