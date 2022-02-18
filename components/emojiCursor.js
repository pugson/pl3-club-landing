export default function emojiCursor() {
  let element = document.body;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let cursor = { x: width / 2, y: width / 2 };
  let particles = [];
  let canvas, context;

  let baseImage = new Image();
  baseImage.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAABnxYm9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAAKH0lEQVRoBe1YS29cSRU+995+uG13O3bS8ZAJjuexmElmFCYTWIQIOcoiO3bJni1/gvYPYAvKErGzlQUaiQ0o6QWLEQoLAp4RhDiD80BJx4+47U73ffJ9VfdcV7c7IbBASLhadU/VqfP4zqm6VdVX5KgcZeAoA0cZ+L/PQJZlHqq/srISaGW/1Wr5SI73pgS9cfBNiv/uGEGurq76zWaz8NnpdLIbN24k/8oWg6Le0tJSBtnU8zxSU0rayCmNF4MjY2/dJVgIe+1226/X6976+jqdEuhYsHfu3Dnm+34zSZIK5MqglN+Hnb2rV6++yHVd/wXOIhv5qHfz5s3S7Oxsev369aFIXW1tE+jy8rJ39uxZTzOLLFEvVRmld+/eLYdheCYIgk/AO4f6bcgtgp6CnXnU2TRNfdQANYvjOAKvj/ZTyDyA3h8h/xsk5PcXL17s0TeKyRTGRThN46ZTp88IOQ8ATWjAYRXNtbW1SrfbPYPxc8jsd1A/Y7tUKi3MzMyUa7WagGfkkW2JokgAeKgCuLBCTwBeoCt7e3uyvb29Dv7StWvXHvEdKSESH0Jpv9//GGv051NTU19A+Pb09PT6pUuXtsYFpUjv379f3dzcbKI/D6MLcHQewC4MBoOPJycnzxAs7BnnqgPbReAECOBw70HNN2AhxxeabZMctDmbGfQy2CrjvXkfPuu0x5kvAbRZRjs7O0G1Wr08Nzd3GVMtCGjz9u3b38DwExjbhnwX1QdIrtM66MLW1tY75XL5JOoUplYAWtA2QCBD4AnkuKToQ3eUAG2TXVItBM1CUStudx/wg3wsgy0BtnB3d9e8S1jmWfESA0wGADGFG41GAODHAeY4lD7X7JCy0pDy6IxtgmWWUNlXwARrACs4UhbqcAZUf9SeO+YEZVTh3ySdnSIAZg6FzjwIZDDIt8RMHw3kwArwNMKiFPJoWqxMAgFpob4WbRMgZVjJYx1t044GojKqr/aKAMjQQVIocy0W2aMxFpe68mxrVWBGIX+orPJUdhylzDj+qA3KDQWgilbfZkTBqEHNkssfbass7bGMc6wyr6NWczgQ5bl0KAA1RgFtj6MaBMfc9qisOiJ/tLg81VMZd0x5pKNy5A0FQAaLCiodx9OxN1Fj7DUPV8+174pTRpesy3fbQwGo0VGDylfqjitPqY65Tjg2Wlxg7ri2X0dH7QwFoIOq7PbJU/6bqMqpjNoYotwQippKhtPYVOxMpNh6JNMKOWx1Vn7IiO2MDYBDCkCp6o4C1HGlKlfQfPcygMnk9soZASicvzgZcW6UKxJEsaRxJGmlIimuFgGuFoJgUlQPwRidPKjCNhrDAVBQHbpSr2u7S0MzCllmjw4J0DimviOLm5qk+/sS91/JYHtbBlub0t/akqjflxA1TrH/1yYkq1TFn5mR8uycCO9Pk1PiV6tDaIoAKojcq06Ih5PUBMFo4ZTVZE0BghqAuRlzOqiMZtVxgUuWJDvbEr/oSPz4kUQPH0j8ZEOSZ/+QqPNUwucbEj1dl2hHJN4ViWAwgj7yL+YUnUSWL16UV+c/l/Jn38XYwQEpy8vCu5Bxt//ll9I4f16SMwviIWofAeE+Ib6HkxLUw+2Aa5EB4swVnxQV57HdSrmOe/sAsiNJ57lEjzYk/gZgH/5N0o37kr14gsQAVr0p3mQdtzNkcrIh/uInEiycw/KJJcPSSUCDGLZSLJ0EN1IsqyzErPzu1zL41U3ZrX9Lus1Fg3lZWlhCeQB7X9yS7q1bsnn5gsSXrkj1/Q9k4t3TUpmdlVINlzRMIW5T+DuEpcklsteVDMtAMP3ZZkdSZDh7CKBPHoq39RiBYkbrJwD4mHiN4+LNzRunfEE5w1mCYADYrQwA11PEmVfKonhYSt7MovgLH4nXhc9XvFfacrCE3ntP/IkKsrgn4S9+KtEzkT5kguOo8whi7l3MCDKexuKH++K9fCg+BAJcbP3pRQkaJySYOSH+3Enx5k9jySNSAkAmTR0AMHla8kBMl/zRyvdHly1txKHIANKYEZGKWnFe4hADPhZgoy7eR9+T4NN8qYCFNwEPVC4l7Bpe+ZQEi+fsUsLS4t0TCwxG7fvhhfDkgqW70X4BgVoHtWAb8Ow5QZvucL+YgQNFZC0aYBoBglnAshGAllJ+r+P/C65LZoXjRoYU49ovjNkGAY4WC9qkZmiowJ1zNTgVGrV1OAD9T69TSk2dStDiBDUZZeqZEZsVGmdr1AlYh4q1YyXZVhcUxDXY+OQfXjbNfzOyDlkZPQcKAYqOZCfXJlFDxkHetxp0aP4OHlgigjHF2MFYimraxVP7jh/oq6/CeW5zaAaGXOUdS2gUP0egyJo6JhBUvrykLI547u6AcAzSeNrZ44jl5fs/s89NCEzD52NMGQqA42rEpa4esVnwFjA/AeHgNC8ydegTb4Qp7LvF9DU4ULXDWaANrdYH/RAPw+STP4vPtVkEgE3KFqPEpm1YI1ZRTdDQSPIK41y/DEJ3JYqOKybvzDKrEbCeCNZWMPHZx8gZDuSMbSutNosAyDAmiBuVB5YPYxRnZvgisW3ND8tSnkrWgQV/6JMRhyGVQCjO0izCyT3ABa4fRn4vDP0wirwIu1uMUzjGIZfhFGYgZc+Pq0hJmT6wH+rsmh4eRQD4n08Ratm//OjZ5cAg7MvG7OoOYXeGg+m1GTfgiVMS/KXGiZ2az2tJ4vfjOOjji2EfwF8BZA+n7j4+33QHEWqYRknci/GVK8H1M0mykpelNWzM5SmcnnVca44ji7WJRPaTLE6i2IbjBhAlaamHz3ovozgt+X5SwVcHnGsImLOIV9POJRFqgRG4QXRYwzgWUtx+UwnxoQxA/UGaer049veQ5Zc4JLf7gxTfCZ8i839BUH9N0uwxAD8No+QRED2LBtl2Vo2i/qAcl8KwHJTSY7A9jS80HwT98NNaf3BhqlL9/rHJ2kyZd3CUtTXcWPCRMuN1rlItvexE8ePeXu90M4r9Bj6zTOAQq+IAq4KW8YEKgeEkxkUL4aS43WGGzBdb3hwH8NZDdncBuBvF+4Mk3Qiz5Oswye4hq3/Csfd1169t/PLeV7jMvFXBZcaUP+C5wtaPPnynWY2rV/wJecH+yqpZ6WyavGY/bjanu1X5AYBeQz1f9YMPMRMnK75friEQ3k75WgEMrr3ZIMlkC+/K8zjznmHF/D1Ova8wLfdSL77/sz8/wPXTrELaL0qLr9bS0tBSXmu3MyaSQj8BXc7neQ0UfE+WMNCWtDVsj2uBe0BRDKPoofHDEyfqjYmJeT9I65nnNzhvuD6nWbk0AOm8LPU6q2udPVfHba9cvx78dn3dP1WvZ9JupwQHJwaoK/e27VYefKvdZg6NHTcAcrwrwLi0hOHDEYM5vrRayGrbySrAtqyD/xjseE+HuUMBHB4WD0A8TmVnSbwlCLRRm20xU976L4GEy6NylIGjDBxl4H80A/8EO3Ii+TYIEjMAAAAASUVORK5CYII=";

  function init() {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";
    canvas.style.position = "fixed";
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;

    bindEvents();
    loop();
  }

  // Bind events that are needed
  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage);
      }
    }
  }

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    addParticle(cursor.x, cursor.y, baseImage);
  }

  function addParticle(x, y, image) {
    particles.push(new Particle(x, y, image));
  }

  function updateParticles() {
    context.clearRect(0, 0, width, height);

    // Update
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(context);
    }

    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles.splice(i, 1);
      }
    }
  }

  function loop() {
    updateParticles();
    requestAnimationFrame(loop);
  }

  /**
   * Particles
   */

  function Particle(x, y, image) {
    const lifeSpan = 120;
    this.initialLifeSpan = lifeSpan; //ms
    this.lifeSpan = lifeSpan; //ms
    this.position = { x: x, y: y };

    this.image = image;

    this.update = function (context) {
      this.lifeSpan--;
      const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

      context.globalAlpha = opacity;
      context.drawImage(
        this.image,
        this.position.x + 10, // - (this.canv.width / 2) * scale,
        this.position.y + 5 //- this.canv.height / 2
      );
    };
  }

  init();
}
