export const NoFlags = /*                      */ 0b00000000000000000000000;
export const PerformedWork = /*                */ 0b00000000000000000000001;

// You can change the rest (and add more).
export const Placement = /*                    */ 0b00000000000000000000010;
export const Update = /*                       */ 0b00000000000000000000100;
export const PlacementAndUpdate = /*           */ Placement | Update;
export const Deletion = /*                     */ 0b00000000000000000001000;
export const ChildDeletion = /*                */ 0b00000000000000000010000;
export const ContentReset = /*                 */ 0b00000000000000000100000;
export const Callback = /*                     */ 0b00000000000000001000000;
export const DidCapture = /*                   */ 0b00000000000000010000000;
export const Ref = /*                          */ 0b00000000000000100000000;
export const Snapshot = /*                     */ 0b00000000000001000000000;
export const Passive = /*                      */ 0b00000000000010000000000;
export const Hydrating = /*                    */ 0b00000000000100000000000;
export const HydratingAndUpdate = /*           */ Hydrating | Update;
export const Visibility = /*                   */ 0b00000000001000000000000;
