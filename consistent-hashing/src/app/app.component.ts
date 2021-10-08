import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  speed = 1000;
  title = 'consistent-hashing';
  canvas!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  colors: Array<string> = ["#EF5350", "#7E57C2", "#29B6F6", "#66BB6A", "#FF7043", "#FFEE58", "#8D6E63"];
  circles_1: Array<d3.Selection<SVGCircleElement, unknown, HTMLElement, any>> = []
  circles_2: Array<d3.Selection<SVGCircleElement, unknown, HTMLElement, any>> = []

  constructor() {
  }

  ngOnInit() {
    this.canvas = d3.select("#container")
      .append("svg")
      .attr("class", "svg-component")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);
    for (let i = 0; i < 20; i++) {
      var circle = this.canvas.append("circle")
        .style("fill", "#dddddd")
        .attr("r", 25)
        .attr("cx", 200)
        .attr("cy", 400);
      this.circles_1.push(circle);
    }
  }

  ngAfterViewInit() {
    this.make();
    this.ring();
  }

  private async make() {
    for (let i = 0; i < this.circles_1.length; i++) {
      this.circles_1[i]
        .transition().duration(1 * this.speed)
        .attr("cx", 200 + 75 * i)
        .transition().duration(1 * this.speed)
        .style("fill", this.colors[i % 5])
        ;
    }
    d3.timeout(
      () => {
        for (let i = 0; i < 4; i++) {
          this.circles_1[i]
            .transition().duration(1 * this.speed)
            .attr("r", 35)
            .transition().duration(2 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 25)
            ;
        }
      }, 2 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < 5; i++) {
          this.circles_1[i]
            .transition().duration(1 * this.speed)
            .attr("r", 35)
            .transition().duration(2 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 25)
            ;
        }
      }, 2 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 5; i < 10; i++) {
          this.circles_1[i]
            .transition().duration(1 * this.speed)
            .attr("r", 35)
            .transition().duration(2 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 25)
            ;
        }
      }, 7 * this.speed
    );

    // The new nodes
    d3.timeout(
      () => {
        for (let i = 0; i < 20; i++) {
          var circle = this.canvas.append("circle")
            .style("fill", this.colors[i % 5])
            .attr("r", 25)
            .attr("cx", 200 + 75 * i)
            .attr("cy", 400)
            ;
          this.circles_2.push(circle);
        }
      },
      10 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < 20; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .attr("cy", 600)
            ;
        }
      },
      11 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 3; i < 20; i += 5) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("fill", '#333333')
            .transition().duration(1 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 10)
            .style("fill", this.colors[((i - 3) / 5) % 5])
            .transition().duration(1 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 25)
            .style("fill", '#333333')
            ;
        }
      },
      13 * this.speed
    );
    // Start coloring trial 1
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("fill", this.colors[i % 4])
            ;
        }
      },
      18 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          if (i % 5 != i % 4) {
            this.canvas.append("rect")
              .style("fill", "transparent")
              .style("stroke", "red")
              .attr("x", 200 + 75 * i - 30)
              .attr("y", 350)
              .attr("width", 60)
              .attr("height", 300)
              .transition().duration(2 * this.speed)
              .transition().duration(1 * this.speed)
              .style("opacity", 0.0)
              ;
          }
        }
      },
      20 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("opacity", 0.0)
            ;
        }
      },
      22 * this.speed
    );
  }

  private async ring() {
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_1.length; i++) {
          this.circles_1[i]
            .transition().duration(1 * this.speed)
            .attr("cx", 500 + 200 * Math.sin((i / 20) * 2 * Math.PI))
            .attr("cy", 500 + 200 * Math.cos((i / 20) * 2 * Math.PI))
            ;
        }
      },
      23 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_1.length; i++) {
          this.circles_1[i]
            .transition().duration(1 * this.speed)
            .style("fill", this.colors[Math.floor(i * 5 / 20)])
            ;
        }
      },
      25 * this.speed
    );
    d3.timeout(
      () => {
        this.circles_2 = [];
        for (let i = 0; i < 20; i++) {
          var circle = this.canvas.append("circle")
            .style("fill", this.colors[Math.floor(i * 5 / 20)])
            .attr("r", 25)
            .attr("cx", 500 + 200 * Math.sin((i / 20) * 2 * Math.PI))
            .attr("cy", 500 + 200 * Math.cos((i / 20) * 2 * Math.PI))
            ;
          this.circles_2.push(circle);
        }
      },
      26 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < 20; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .attr("cx", 500 + 300 * Math.sin((i / 20) * 2 * Math.PI))
            .attr("cy", 500 + 300 * Math.cos((i / 20) * 2 * Math.PI))
            ;
        }
      },
      27 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 3 * 5; i < 4 * 5; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("fill", '#333333')
            .transition().duration(1 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 10)
            // .style("fill", this.colors[i % 5])
            // .transition().duration(1 * this.speed)
            .transition().duration(1 * this.speed)
            .attr("r", 25)
            .style("fill", '#333333')
            ;
        }
      },
      29 * this.speed
    );

    // Start coloring trial 2
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("fill", this.colors[Math.floor(i * 4 / 20)])
            ;
        }
      },
      35 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          if (Math.floor(i / 5) != Math.floor(i / 4)) {
            this.canvas.append("line")
              .style("fill", "transparent")
              .style("stroke", "red")
              .attr("x1", 500 + 350 * Math.sin(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("y1", 500 + 350 * Math.cos(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("x2", 500 + 350 * Math.sin(((i - 0.45) / 20) * 2 * Math.PI))
              .attr("y2", 500 + 350 * Math.cos(((i - 0.45) / 20) * 2 * Math.PI))
              .transition().duration(2 * this.speed)
              .transition().duration(1 * this.speed)
              .style("opacity", 0.0)
              ;
            this.canvas.append("line")
              .style("fill", "transparent")
              .style("stroke", "red")
              .attr("x1", 500 + 150 * Math.sin(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("y1", 500 + 150 * Math.cos(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("x2", 500 + 150 * Math.sin(((i - 0.45) / 20) * 2 * Math.PI))
              .attr("y2", 500 + 150 * Math.cos(((i - 0.45) / 20) * 2 * Math.PI))
              .transition().duration(2 * this.speed)
              .transition().duration(1 * this.speed)
              .style("opacity", 0.0)
              ;
            this.canvas.append("line")
              .style("fill", "transparent")
              .style("stroke", "red")
              .attr("x1", 500 + 150 * Math.sin(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("y1", 500 + 150 * Math.cos(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("x2", 500 + 350 * Math.sin(((i + 0.45) / 20) * 2 * Math.PI))
              .attr("y2", 500 + 350 * Math.cos(((i + 0.45) / 20) * 2 * Math.PI))
              .transition().duration(2 * this.speed)
              .transition().duration(1 * this.speed)
              .style("opacity", 0.0)
              ;
            this.canvas.append("line")
              .style("fill", "transparent")
              .style("stroke", "red")
              .attr("x1", 500 + 150 * Math.sin(((i - 0.45) / 20) * 2 * Math.PI))
              .attr("y1", 500 + 150 * Math.cos(((i - 0.45) / 20) * 2 * Math.PI))
              .attr("x2", 500 + 350 * Math.sin(((i - 0.45) / 20) * 2 * Math.PI))
              .attr("y2", 500 + 350 * Math.cos(((i - 0.45) / 20) * 2 * Math.PI))
              .transition().duration(2 * this.speed)
              .transition().duration(1 * this.speed)
              .style("opacity", 0.0)
              ;
          }
        }
      },
      37 * this.speed
    );
    d3.timeout(
      () => {
        for (let i = 0; i < this.circles_2.length; i++) {
          this.circles_2[i]
            .transition().duration(1 * this.speed)
            .style("opacity", 0.0)
            ;
        }
      },
      40 * this.speed
    );

  }
}
