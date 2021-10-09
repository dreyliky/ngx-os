/** Settings for {@link FixedToParentDirective} */
export class FixedToParentConfig {
    /** Is should be fixed to parent or not */
    public isEnabled?: boolean = true;
    /** Recalculation interval of the element position in milliseconds */
    public recalculationIntervalInMs?: number = 5;
    /**
     * Amount of calculations after scroll.
     *
     * Some browsers have animated scroll and need to run several iterations
     * with some delay between them to calculate actual element position.
     *
     * Unfortunately, there is no better way to observe the end of the scroll animation.
     **/
    public calculationIterationsCount?: number = 30;
}
