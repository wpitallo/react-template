<div class="markdown prose w-full break-words dark:prose-invert dark">
  <p>Yes, you can extract the <code>firestore.indexes.json</code> file from your Firestore database as a backup. This
    file can be exported using the Firebase CLI. Here’s how you can do it:</p>
  <h3>Steps to Extract <code>firestore.indexes.json</code>:</h3>
  <ol>
    <li>
      <p><strong>Ensure You Have the Firebase CLI Installed</strong>:</p>
      <ul>
        <li>If you haven’t already installed the Firebase CLI, you can do so by running:
          <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm install -g firebase-tools
</code></div></div></pre>
        </li>
      </ul>
    </li>
    <li>
      <p><strong>Log In to Firebase</strong>:</p>
      <ul>
        <li>Make sure you’re logged in to your Firebase account:
          <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">firebase login
</code></div></div></pre>
        </li>
      </ul>
    </li>
    <li>
      <p><strong>Initialize Firebase in Your Project (if not already done)</strong>:</p>
      <ul>
        <li>If your project is not initialized, navigate to your project directory and run:
          <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">firebase init
</code></div></div></pre>
        </li>
        <li>Select <strong>Firestore</strong> from the list of options during the setup process.</li>
      </ul>
    </li>
    <li>
      <p><strong>Use the Firebase CLI to Export Indexes</strong>:</p>
      <ul>
        <li>You can export your existing Firestore indexes to a <code>firestore.indexes.json</code> file using the
          following command:
          <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">firebase firestore:indexes
</code></div></div></pre>
        </li>
        <li>You can export your existing Firestore indexes to a <code>firestore.indexes.json</code> file using the
          following command:
          <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">firebase firestore:indexes > firestore.indexes.json

</code></div></div></pre>
</li>
</ul>
</li>

  </ol>
  <h3>What This Does:</h3>
  <ul>
    <li>The above command will generate a <code>firestore.indexes.json</code> file in your project's root directory.
      This file will contain all the composite indexes that are currently defined in your Firestore database.</li>
  </ul>
  <h3>Example Content of <code>firestore.indexes.json</code>:</h3>
  <pre><div class="dark bg-gray-950 contain-inline-size rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>json</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"indexes"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">"collectionGroup"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"entrants"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"queryScope"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"COLLECTION"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"fields"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">"fieldPath"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"isActive"</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">"order"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"ASCENDING"</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">"fieldPath"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"creationDate"</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">"order"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"DESCENDING"</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">"fieldPath"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"__name__"</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">"order"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"ASCENDING"</span> <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"fieldOverrides"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></div></div></pre>
  <h3>Backup and Version Control:</h3>
  <ul>
    <li>Once you have this file, you can back it up or check it into version control (like Git) to maintain a history of
      your Firestore indexes. This allows for easy restoration or migration of indexes across different projects or
      environments.</li>
  </ul>
  <p>This approach ensures that you have a reliable backup of your Firestore index configuration that you can redeploy
    or modify as needed.</p>
</div>
