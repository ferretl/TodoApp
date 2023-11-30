export {RNG}


abstract class RNG {
    private static m = 0x80000000;
    private static a = 1103515245;
    private static c = 12345;

    /**
     * Generates a hash value based on the given seed.
     * @param seed The seed value used for generating the hash.
     * @returns The generated hash value.
     */
    public static hash = (seed: number) => (RNG.a*seed + RNG.c) % RNG.m;

}

