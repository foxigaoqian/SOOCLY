import type { VerificationProgress } from "@/lib/verification-data";
import styles from "./verification-status-card.module.css";

type VerificationStatusCardProps = {
  lookName: string;
  deviceName: string;
  progress: VerificationProgress;
};

function CheckState({ complete, completeLabel = "Complete" }: { complete: boolean; completeLabel?: string }) {
  return (
    <span className={complete ? styles.complete : styles.pending}>
      <i aria-hidden="true" />
      {complete ? completeLabel : "Pending"}
    </span>
  );
}

export function VerificationStatusCard({
  lookName,
  deviceName,
  progress,
}: VerificationStatusCardProps) {
  const publiclyVerified = progress.status === "verified" && progress.canBeVerified;
  const statusLabel = publiclyVerified
    ? `Verified on ${deviceName}`
    : progress.status === "testing"
      ? "Camera testing in progress"
      : "Prototype · not camera-verified";

  const headline = publiclyVerified
    ? `Real-camera proof for ${deviceName}.`
    : progress.status === "testing"
      ? `Building real-camera proof for ${deviceName}.`
      : `Reference now. Camera proof comes before Verified.`;

  const summary = publiclyVerified
    ? `${lookName} has passed SOOCLY's camera-proof gate for ${deviceName}: real sample output, same-scene comparisons, validated settings, and confirmed image rights.`
    : `${lookName} is not yet claimed as verified ${deviceName} output. SOOCLY only turns on the Verified label after every proof check below is complete.`;

  return (
    <div className={`${styles.card} ${publiclyVerified ? styles.verified : ""}`}>
      <div className={styles.topline}>
        <span className={styles.mark} aria-hidden="true"><i /><i /></span>
        <p>Camera proof status</p>
        <span className={publiclyVerified ? styles.statusVerified : styles.statusPending}>
          <i aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      <div className={styles.intro}>
        <h2 id="proof-title">{headline}</h2>
        <p>{summary}</p>
      </div>

      <dl className={styles.grid} aria-label={`${lookName} verification progress for ${deviceName}`}>
        <div>
          <dt>Real camera samples</dt>
          <dd>
            <strong>{progress.sampleCount}</strong>
            <span>/ {progress.requiredSampleCount}</span>
          </dd>
          <CheckState complete={progress.sampleCount >= progress.requiredSampleCount} completeLabel="Enough samples" />
        </div>

        <div>
          <dt>Same-scene Split pairs</dt>
          <dd>
            <strong>{progress.splitPairCount}</strong>
            <span>/ {progress.requiredSplitPairCount}</span>
          </dd>
          <CheckState complete={progress.splitPairCount >= progress.requiredSplitPairCount} completeLabel="Enough pairs" />
        </div>

        <div>
          <dt>Camera settings</dt>
          <dd className={styles.wordValue}>{progress.settingsValidated ? "Validated" : "Not tested"}</dd>
          <CheckState complete={progress.settingsValidated} completeLabel="Validated" />
        </div>

        <div>
          <dt>Image rights</dt>
          <dd className={styles.wordValue}>{progress.rightsConfirmed ? "Confirmed" : "Not confirmed"}</dd>
          <CheckState complete={progress.rightsConfirmed} completeLabel="Confirmed" />
        </div>
      </dl>

      <p className={styles.rule}>
        Verified requires all four checks: at least {progress.requiredSampleCount} real camera samples, {progress.requiredSplitPairCount} same-scene Default ↔ Look pairs, validated settings, and confirmed image rights.
      </p>
    </div>
  );
}
