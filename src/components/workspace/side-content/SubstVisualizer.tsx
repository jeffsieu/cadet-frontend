import { parse } from 'acorn'; // remove this
import { Program } from 'estree';  // remove this
import * as React from 'react';
import { SubstTimeline, ISubstTimelineProps } from './../../SubstTimeline';

class SubstVisualizer extends React.Component<ISubstTimelineProps, {}> {

  private tre : Program[]; // remove this

  constructor(props : ISubstTimelineProps) {
    super(props);

    let n = parse("function f(x) {return x + 1;} f(5);");

    this.tre = [(n as any) as Program];
  }

  public render() {
    // return <div ref={r => (this.$parent = r)} className="sa-subst-visualizer" />;
    return <SubstTimeline trees={this.tre} />; // props.trees} />;
  }
}

export default SubstVisualizer;