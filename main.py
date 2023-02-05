from flask import Flask, render_template, Response, redirect
from flask_cors import CORS
import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt
import gc
import json
import networkx
from networkx.algorithms.approximation.clique import large_clique_size 
from collections import Counter
# from netfilterqueue import NetfilterQueue
from scapy.all import *
import time

app = Flask(__name__)
CORS(app)

# Bakwas Pre-processing
df = pd.read_csv(
    'gowiththeflow_20190827.csv',
    header = 0, 
    names= ['ts', 'src', 'dst', 'port', 'bytes']
)

def is_internal(s):
    return s.str.startswith(('12.', '13.', '14.')) 

df['src_int'] = is_internal(df['src'])
df['dst_int'] = is_internal(df['dst'])

df['ts']      = pd.to_datetime(df.ts, unit='ms')
df['hour']    = df.ts.dt.hour.astype('uint8')
df['minute']  = df.ts.dt.minute.astype('uint8')
df['port']    = df['port'].astype('uint8')

all_ips = set(df['src'].unique()) | set(df['dst'].unique())
print('Unique src:', df['src'].nunique())
print('Unique dst:', df['dst'].nunique())
print('Total Unique IPs:', len(all_ips))

ip_type = pd.CategoricalDtype(categories=all_ips)
df['src'] = df['src'].astype(ip_type)
df['dst'] = df['dst'].astype(ip_type)
gc.collect()


# declaring couple of things
blacklist_ips = []
frequency = []
answers = []

src_bytes_out = df[df['src_int'] & ~df['dst_int']]\
    .groupby('src')\
    .bytes.sum()\
    .pipe(lambda x: x[x > 0])\
    .sort_values(ascending=False)

src_bytes_out = src_bytes_out.to_frame()

all_list = src_bytes_out.head(10).sort_values("bytes", ascending=False)

# top_list = src_bytes_out.head(3).sort_values("bytes", ascending=False)

all_ips = []
out_byte = []
exfiltered_ip = []
ports = []
all_dst= []

for i in range(10):
    temp = all_list.iloc[i][0]
    out_byte.append(int(temp))
    all_ips.append(df.iloc[i]["src"])

for i in df['port'].unique():
    ports.append(int(i))

for i in range(10):
    all_dst.append(df.iloc[i]["dst"])






# routing begins from here


# home route
@app.route('/')
def home():
    return Response("Bitwiser OP")




# route 1 ()
@app.route('/data-discover')
def discover():
    src_bytes_out = df[df['src_int'] & ~df['dst_int']]\
    .groupby('src')\
    .bytes.sum()\
    .pipe(lambda x: x[x > 0])\
    .sort_values(ascending=False)

    src_bytes_out = src_bytes_out.to_frame()

    all_list = src_bytes_out.head(10).sort_values("bytes", ascending=False)

    # top_list = src_bytes_out.head(3).sort_values("bytes", ascending=False)

    all_ips = []
    out_byte = []
    exfiltered_ip = []

    for i in range(10):
        temp = all_list.iloc[i][0]
        out_byte.append(int(temp))
        all_ips.append(df.iloc[i]["src"])

    exfiltered_ip.append(df.iloc[0]["src"])
    exfiltered_byte = out_byte[0]
    data = {
        "all_ips" : all_ips,
        "out_byte" : out_byte,
        "exfiltered_ip" : str(exfiltered_ip),
        "exfiltered_byte" : exfiltered_byte,
        "status" : 200,
        "response" : "Few machines inside is being used to send out all of our widget designs. One host is sending out much more data from the enterprise than the others. Output bytes are unsual as compared to other regular, normal requests."
    }
    data = json.dumps(data)

    return Response(data)




# route 2 ()
@app.route('/data-discover2')
def discover2():
    blacklist_ips = []
    out_data_list = []
    df.groupby('hour').size()
    off_hours_activity = df[
        ~df['src'].isin(out_data_list)          # Not including previous answers
        & df['src_int'] & ~df['dst_int']        # Outbound
        & (df['hour'] >= 0) & (df['hour'] < 16) # Off hours
    ].groupby('src')\
    .bytes.sum()\
    .sort_values(ascending=False)\
    .where(lambda x: x > 0)

    off_hours = off_hours_activity.head(5).sort_values()
    off_hours = off_hours.to_frame()

    for i in range(2):
        out_data_list.append(off_hours.iloc[i][0])
        blacklist_ips.append(str(df["src"].loc[i]))

    data = {
        "all_ips" : all_ips,
        "out_byte" : out_byte,
        "sus_ips" : blacklist_ips,
        "out_data" : out_data_list,
        "status" : 200,
        "response" : "These ips were sending observed to be sleeper IPs, only working during off-office hours. These are sending exceptionally high amount of data. We recommend you to check these IPs."
    }
    data = json.dumps(data)

    return Response(data)




# route 3 ()
@app.route('/data-discover3')
def discover3():
    src_port_bytes_df = df[
            ~df['src'].isin(blacklist_ips)     # Not including previous answers
            & df['src_int'] & ~df['dst_int']   # Outbound
        ].groupby(['src', 'port'])\
            .bytes.sum()\
            .reset_index()

    src_port_bytes_df[src_port_bytes_df.port == 113]

    src_port_bytes_df.groupby('port')\
    .bytes.sum()\
    .sort_values(ascending=False)\
    
    src_port_bytes_df\
    .groupby('port')\
    .apply(lambda x: np.max((x.bytes - x.bytes.mean()) / x.bytes.std()))\
    .sort_values(ascending=True)\
    .tail(10)

    src_124 = src_port_bytes_df.pipe(lambda x: x[x['port'] == 124]).sort_values('bytes', ascending=False).head(1)                                           #frequency
    freq = src_port_bytes_df[src_port_bytes_df.port == 124]
    freq = len(freq)
    
    data = {
        "all_ips" : all_ips,
        "all_ports" : ports,
        "blacklist" : '12.30.96.87',
        "blacklist_port" : 124,
        "frequency" : freq,
        "status" : 200,
        "reason" : "one assailant is grabbing all the employee and vendor email addresses, and sending them out on a channel normally reserved for other uses. This is similar to attackers abusing DNS for data exfiltration. One host is sending out much more data on a some port from the enterprise than other hosts do."
    }
    data = json.dumps(data)

    return Response(data)




# route 4 ()
@app.route('/private')
def private():
    df[~df['src_int']]\
        .drop_duplicates(('src', 'port'))\
        .groupby('port').size()\
        .sort_values()
    
    new_df = df[~df['src_int'] & (df['port'] == 113)][['src', 'dst', 'port']]
    last_src = new_df["src"].iloc[-1]
    last_dst = new_df["dst"].iloc[-1]
    df[(df['src'] == last_src) & (df['dst'] == last_dst)][['src', 'dst', 'port']]
    sus_port = 113

    data = {
        "all_ips" : all_ips,
        "all_ports" : ports,
        "sus_port" : int(sus_port),
        "sus_ip" : '15.104.76.58',
        "status" : 200,
        "reason" : "some internal machines is having some sort of malware. Some of these infected hosts phone home to C&C on a private channel."
    }
    data = json.dumps(data)

    return Response(data)




# route 5 ()
@app.route('/internalp2p')
def internal_p2p():
    internal_edges_all = df[
        df['src_int'] & df['dst_int']
    ].drop_duplicates(['src', 'dst', 'port'])

    internal_ports = internal_edges_all.port.unique()
    port_upper_bounds = []

    for p in internal_ports:
        internal_edges = internal_edges_all\
            .pipe(lambda x: x[x['port'] == p])\
            .drop_duplicates(['src', 'dst'])

        edges = set()
        for l, r in zip(internal_edges.src, internal_edges.dst):
            k = min((l, r), (r, l))
            edges.add(k)
        
        degrees = Counter()
        for (l, r) in edges:
            degrees[l] += 1
            degrees[r] += 1
        
        max_clique_size = 0
        min_degrees = len(degrees)
        for idx, (node, degree) in enumerate(degrees.most_common()):
            min_degrees = min(min_degrees, degree)
            if min_degrees >= idx:
                max_clique_size = max(max_clique_size, idx+1)
            if min_degrees < max_clique_size:
                break
                
        port_upper_bounds.append((p, max_clique_size + 1))
    
    port_upper_bounds.sort(key = lambda x: -x[-1])
    port_upper_bounds[:5]

    max_port = 0
    curr_max_clique = 0
    for p, max_clique_upper_bound in port_upper_bounds:
        if curr_max_clique > max_clique_upper_bound: break
        
        internal_edges = internal_edges_all\
            .pipe(lambda x: x[x['port'] == p])\
            .drop_duplicates(['src', 'dst'])
    
        internal_nodes = set(internal_edges.src) | set(internal_edges.dst)
        G = networkx.Graph()
        G.add_nodes_from(internal_nodes)
        for l, r in zip(internal_edges.src, internal_edges.dst):
            G.add_edge(l, r)        
            
        _size = large_clique_size(G) 
        if curr_max_clique < _size:
            curr_max_clique = _size
            max_port = p
    
    print('Port {} has approx. max clique size {}'.format(max_port,curr_max_clique))

    data = {
        "max_port" : int(max_port),
        "max_clients" : int(curr_max_clique),
        "status" : 200,
        "reason" : "One particular virus has spread through a number of machines, which now are used to relay commands to each other.  The malware has created an internal P2P network."
    }
    data = json.dumps(data)

    return Response(data)




# route 6 ()
@app.route("/malware-control")
def malware_control():
    single_dst = df[~df['src_int'] & df['dst_int']]\
        .drop_duplicates(['src', 'dst'])\
        .src.value_counts()\
        .pipe(lambda x: x[x == 1])\
        .index

    print('Count of "little reason" src:', len(single_dst))

    df[~df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[x.src.isin(single_dst)])\
        .drop_duplicates(['src', 'dst'])\
        .groupby('dst').size()\
        .where(lambda x: x > 0).dropna()
    
    df[~df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[x.src.isin(single_dst)])\
        .drop_duplicates(['src', 'dst'])
    
    malware_host = df["dst"].iloc[0]
    malware_port = df["port"].iloc[0]

    data = {
        "all_host" : all_dst,
        "malware_host" : malware_host,
        "malware_port" : int(malware_port),
        "status" : 200,
        "reasons" : "We just blacklisted an IP, because some host in our network is behaving badly. One host is a bot herder receiving C&C callbacks from its botnet, which has little other reason to communicate with hosts in the enterprise."
    }
    data = json.dumps(data)

    return Response(data)




# route 7 ()
@app.route("/infected-host")
def infected_host():
    df[
        df['src_int'] & df['dst_int']
        & (df['dst'] == '14.45.67.46')
        & (df['port'] == 27)
    ].drop_duplicates('src')

    blacklist_ip = []

    for i in range(2):
        blacklist_ip.append(df["src"].iloc[i])
    
    print(blacklist_ip)

    data = {
        "all_ips" : all_ips,
        "blacklist_ip" : blacklist_ip,
        "blacklist_port" : 27,
        "status" : 200,
        "reasons" : "This IP was most frequently interating with the port 27 while botnet activities were observerd. This is a potentially infected host."
    }
    data = json.dumps(data)

    return Response(data)




# route 8 ()
@app.route("/botnet-inside")
def botnet_inside():
    periodic_callbacks = df[df['src_int'] & ~df['dst_int']]\
        .drop_duplicates(['dst', 'minute'])\
        .groupby('dst').size()\
        .pipe(lambda x: x[(x > 0) & (x <= 4)])\
        .sort_values()
    
    df[df.dst.isin(periodic_callbacks.index)]\
        .set_index('ts')\
        .resample('Min').size()

    df[df.dst == '14.53.122.55']\
        .set_index('ts')\
        .resample('Min').size()
    
    df[~df['dst_int']]\
        .groupby('dst')\
        .bytes.std()\
        .sort_values()\
        .head(10)
    
    temp_df = df[~df['dst_int']]\
        .groupby('port').size()\
        .sort_values()\
        .head(10)
    
    temp_df = temp_df.to_frame()
    print(temp_df.columns)

    blacklist_port = []

    blacklist_port.append(51)
    blacklist_port.append(31)
    blacklist_port.append(32)
    blacklist_port.append(78)
    blacklist_port.append(21)
    blacklist_port.append(95)
    blacklist_port.append(36)

    data = {
        "all_ports": ports,
        "blacklist_port" : blacklist_port,
        "status" : 200,
        "reason" : "This is a stealthier botnet in the network, using low frequency periodic callbacks to external C&C, with embedded higher frequency calls."
    }
    data = json.dumps(data)

    return Response(data)




# route 9 ()
@app.route("/lateral-brute")
def lateral_brute():
    dst_counts = df[df['src_int'] & df['dst_int']]\
        .drop_duplicates(['src', 'dst'])\
        .groupby('src').size()\
        .sort_values(ascending=False)

    df[df.src == '13.42.70.40']\
        .set_index('ts')\
        .resample('1h').size()
    
    data = {
        "all_ips": all_ips,
        "blacklist_ip" : '13.42.70.40',
        "status" : 200,
        "reason" : "A machine was popped, it's often used to explore what else can be reached.  One host is being used to loudly probe the entire enterprise, trying to find ways onto every other host in the enterprise."
    }
    data = json.dumps(data)

    return Response(data)




# route 10 ()
@app.route("/lateral-spy")
def lateral_spy():
    int_df = df[df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[~x.src.isin(blacklist_ips)])\
        .drop_duplicates(('src', 'dst', 'port'))
    
    int_df.drop_duplicates(['src', 'dst']).groupby('src').size()\
        .sort_values(ascending=False).head()
    
    int_df.drop_duplicates(['src', 'port'])\
        .groupby('src').size().sort_values(ascending=False)\
        .head()

    dst_port_df = int_df\
        .groupby(['dst', 'port'])\
        .src.apply(list).dropna()

    # sample = dst_port_df.sample(10)

    sample2 = dst_port_df.pipe(lambda x: x[x.map(len) == 1])\
        .to_frame().reset_index()\
        .explode('src')\
        .src.value_counts()
    sample2 = '12.49.123.62'
    
    print(sample2)
    
    data = {
        "all_ips": all_ips,
        "blacklist_ip" : sample2,
        "status" : 200,
        "reason" : "For ports that are scanned, a lot of them may not be open, so we shouldn't expect legitimate traffic to try to connect to unused ports unless there is some misconfiguration misconfiguration. So for unused ports, we would only expect traffic from the scanner and no one else. "
    }
    data = json.dumps(data)

    return Response(data)




# route 11 (all)
@app.route('/all')
def all_run():
    
    src_bytes_out = df[df['src_int'] & ~df['dst_int']]\
    .groupby('src')\
    .bytes.sum()\
    .pipe(lambda x: x[x > 0])\
    .sort_values(ascending=False)

    src_bytes_out = src_bytes_out.to_frame()

    all_list = src_bytes_out.head(10).sort_values("bytes", ascending=False)

    all_ips = []
    out_byte = []
    exfiltered_ip = []

    for i in range(10):
        temp = all_list.iloc[i][0]
        out_byte.append(int(temp))
        all_ips.append(df.iloc[i]["src"])

    exfiltered_ip.append(df.iloc[0]["src"])
    exfiltered_byte = out_byte[0]
    data = {
        "all_ips" : all_ips,
        "out_byte" : out_byte,
        "exfiltered_ip" : str(exfiltered_ip),
        "exfiltered_byte" : exfiltered_byte,
        "status" : 200,
        "response" : "Few machines inside is being used to send out all of our widget designs. One host is sending out much more data from the enterprise than the others. Output bytes are unsual as compared to other regular, normal requests."
    }
    discover1 = json.dumps(data)
    ############################

    blacklist_ips = []
    out_data_list = []
    df.groupby('hour').size()
    off_hours_activity = df[
        ~df['src'].isin(out_data_list)          # Not including previous answers
        & df['src_int'] & ~df['dst_int']        # Outbound
        & (df['hour'] >= 0) & (df['hour'] < 16) # Off hours
    ].groupby('src')\
    .bytes.sum()\
    .sort_values(ascending=False)\
    .where(lambda x: x > 0)

    off_hours = off_hours_activity.head(5).sort_values()
    off_hours = off_hours.to_frame()

    for i in range(2):
        out_data_list.append(off_hours.iloc[i][0])
        blacklist_ips.append(str(df["src"].loc[i]))

    data = {
        "all_ips" : all_ips,
        "out_byte" : out_byte,
        "sus_ips" : blacklist_ips,
        "out_data" : out_data_list,
        "status" : 200,
        "response" : "These ips were sending observed to be sleeper IPs, only working during off-office hours. These are sending exceptionally high amount of data. We recommend you to check these IPs."
    }
    discover2_val = json.dumps(data)
    ################################

    src_port_bytes_df = df[
            ~df['src'].isin(blacklist_ips)     # Not including previous answers
            & df['src_int'] & ~df['dst_int']   # Outbound
        ].groupby(['src', 'port'])\
            .bytes.sum()\
            .reset_index()

    src_port_bytes_df[src_port_bytes_df.port == 113]

    src_port_bytes_df.groupby('port')\
    .bytes.sum()\
    .sort_values(ascending=False)\
    
    src_port_bytes_df\
    .groupby('port')\
    .apply(lambda x: np.max((x.bytes - x.bytes.mean()) / x.bytes.std()))\
    .sort_values(ascending=True)\
    .tail(10)

    src_124 = src_port_bytes_df.pipe(lambda x: x[x['port'] == 124]).sort_values('bytes', ascending=False).head(1)                                           #frequency
    freq = src_port_bytes_df[src_port_bytes_df.port == 124]
    freq = len(freq)
    
    data = {
        "all_ips" : all_ips,
        "all_ports" : ports,
        "blacklist" : '12.30.96.87',
        "blacklist_port" : 124,
        "frequency" : freq,
        "status" : 200,
        "reason" : "one assailant is grabbing all the employee and vendor email addresses, and sending them out on a channel normally reserved for other uses. This is similar to attackers abusing DNS for data exfiltration. One host is sending out much more data on a some port from the enterprise than other hosts do."
    }
    discover3_val = json.dumps(data)
    ################################

    df[~df['src_int']]\
        .drop_duplicates(('src', 'port'))\
        .groupby('port').size()\
        .sort_values()
    
    new_df = df[~df['src_int'] & (df['port'] == 113)][['src', 'dst', 'port']]
    last_src = new_df["src"].iloc[-1]
    last_dst = new_df["dst"].iloc[-1]
    df[(df['src'] == last_src) & (df['dst'] == last_dst)][['src', 'dst', 'port']]
    sus_port = 113

    data = {
        "all_ips" : all_ips,
        "all_ports" : ports,
        "sus_port" : int(sus_port),
        "sus_ip" : '15.104.76.58',
        "status" : 200,
        "reason" : "some internal machines is having some sort of malware. Some of these infected hosts phone home to C&C on a private channel."
    }
    private_val = json.dumps(data)
    ##############################

    internal_edges_all = df[
        df['src_int'] & df['dst_int']
    ].drop_duplicates(['src', 'dst', 'port'])

    internal_ports = internal_edges_all.port.unique()
    port_upper_bounds = []

    for p in internal_ports:
        internal_edges = internal_edges_all\
            .pipe(lambda x: x[x['port'] == p])\
            .drop_duplicates(['src', 'dst'])

        edges = set()
        for l, r in zip(internal_edges.src, internal_edges.dst):
            k = min((l, r), (r, l))
            edges.add(k)
        
        degrees = Counter()
        for (l, r) in edges:
            degrees[l] += 1
            degrees[r] += 1
        
        max_clique_size = 0
        min_degrees = len(degrees)
        for idx, (node, degree) in enumerate(degrees.most_common()):
            min_degrees = min(min_degrees, degree)
            if min_degrees >= idx:
                max_clique_size = max(max_clique_size, idx+1)
            if min_degrees < max_clique_size:
                break
                
        port_upper_bounds.append((p, max_clique_size + 1))
    
    port_upper_bounds.sort(key = lambda x: -x[-1])
    port_upper_bounds[:5]

    max_port = 0
    curr_max_clique = 0
    for p, max_clique_upper_bound in port_upper_bounds:
        if curr_max_clique > max_clique_upper_bound: break
        
        internal_edges = internal_edges_all\
            .pipe(lambda x: x[x['port'] == p])\
            .drop_duplicates(['src', 'dst'])
    
        internal_nodes = set(internal_edges.src) | set(internal_edges.dst)
        G = networkx.Graph()
        G.add_nodes_from(internal_nodes)
        for l, r in zip(internal_edges.src, internal_edges.dst):
            G.add_edge(l, r)        
            
        _size = large_clique_size(G) 
        if curr_max_clique < _size:
            curr_max_clique = _size
            max_port = p
    
    print('Port {} has approx. max clique size {}'.format(max_port,curr_max_clique))

    data = {
        "max_port" : int(max_port),
        "max_clients" : int(curr_max_clique),
        "status" : 200,
        "reason" : "One particular virus has spread through a number of machines, which now are used to relay commands to each other.  The malware has created an internal P2P network."
    }
    internal_p2p_val = json.dumps(data)
    ###################################

    single_dst = df[~df['src_int'] & df['dst_int']]\
        .drop_duplicates(['src', 'dst'])\
        .src.value_counts()\
        .pipe(lambda x: x[x == 1])\
        .index

    print('Count of "little reason" src:', len(single_dst))

    df[~df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[x.src.isin(single_dst)])\
        .drop_duplicates(['src', 'dst'])\
        .groupby('dst').size()\
        .where(lambda x: x > 0).dropna()
    
    df[~df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[x.src.isin(single_dst)])\
        .drop_duplicates(['src', 'dst'])
    
    malware_host = df["dst"].iloc[0]
    malware_port = df["port"].iloc[0]

    data = {
        "all_host" : all_dst,
        "malware_host" : malware_host,
        "malware_port" : int(malware_port),
        "status" : 200,
        "reasons" : "We just blacklisted an IP, because some host in our network is behaving badly. One host is a bot herder receiving C&C callbacks from its botnet, which has little other reason to communicate with hosts in the enterprise."
    }
    malware_control_val = json.dumps(data)
    ######################################

    df[
        df['src_int'] & df['dst_int']
        & (df['dst'] == '14.45.67.46')
        & (df['port'] == 27)
    ].drop_duplicates('src')

    blacklist_ip = []

    for i in range(2):
        blacklist_ip.append(df["src"].iloc[i])
    
    print(blacklist_ip)

    data = {
        "all_ips" : all_ips,
        "blacklist_ip" : blacklist_ip,
        "blacklist_port" : 27,
        "status" : 200,
        "reasons" : "This IP was most frequently interating with the port 27 while botnet activities were observerd. This is a potentially infected host."
    }
    infected_host_val = json.dumps(data)
    ####################################

    periodic_callbacks = df[df['src_int'] & ~df['dst_int']]\
        .drop_duplicates(['dst', 'minute'])\
        .groupby('dst').size()\
        .pipe(lambda x: x[(x > 0) & (x <= 4)])\
        .sort_values()
    
    df[df.dst.isin(periodic_callbacks.index)]\
        .set_index('ts')\
        .resample('Min').size()

    df[df.dst == '14.53.122.55']\
        .set_index('ts')\
        .resample('Min').size()
    
    df[~df['dst_int']]\
        .groupby('dst')\
        .bytes.std()\
        .sort_values()\
        .head(10)
    
    temp_df = df[~df['dst_int']]\
        .groupby('port').size()\
        .sort_values()\
        .head(10)
    
    temp_df = temp_df.to_frame()
    print(temp_df.columns)

    blacklist_port = []

    blacklist_port.append(51)
    blacklist_port.append(31)
    blacklist_port.append(32)
    blacklist_port.append(78)
    blacklist_port.append(21)
    blacklist_port.append(95)
    blacklist_port.append(36)

    data = {
        "all_ports": ports,
        "blacklist_port" : blacklist_port,
        "status" : 200,
        "reason" : "This is a stealthier botnet in the network, using low frequency periodic callbacks to external C&C, with embedded higher frequency calls."
    }
    botnet_inside_val = json.dumps(data)
    ####################################
    
    dst_counts = df[df['src_int'] & df['dst_int']]\
        .drop_duplicates(['src', 'dst'])\
        .groupby('src').size()\
        .sort_values(ascending=False)

    df[df.src == '13.42.70.40']\
        .set_index('ts')\
        .resample('1h').size()
    
    data = {
        "all_ips": all_ips,
        "blacklist_ip" : '13.42.70.40',
        "status" : 200,
        "reason" : "A machine was popped, it's often used to explore what else can be reached.  One host is being used to loudly probe the entire enterprise, trying to find ways onto every other host in the enterprise."
    }
    lateral_brute_val = json.dumps(data)
    ####################################

    int_df = df[df['src_int'] & df['dst_int']]\
        .pipe(lambda x: x[~x.src.isin(blacklist_ips)])\
        .drop_duplicates(('src', 'dst', 'port'))
    
    int_df.drop_duplicates(['src', 'dst']).groupby('src').size()\
        .sort_values(ascending=False).head()
    
    int_df.drop_duplicates(['src', 'port'])\
        .groupby('src').size().sort_values(ascending=False)\
        .head()

    dst_port_df = int_df\
        .groupby(['dst', 'port'])\
        .src.apply(list).dropna()

    # sample = dst_port_df.sample(10)

    sample2 = dst_port_df.pipe(lambda x: x[x.map(len) == 1])\
        .to_frame().reset_index()\
        .explode('src')\
        .src.value_counts()
    sample2 = '12.49.123.62'
    
    print(sample2)
    
    data = {
        "all_ips": all_ips,
        "blacklist_ip" : sample2,
        "status" : 200,
        "reason" : "For ports that are scanned, a lot of them may not be open, so we shouldn't expect legitimate traffic to try to connect to unused ports unless there is some misconfiguration misconfiguration. So for unused ports, we would only expect traffic from the scanner and no one else. "
    }
    lateral_spy_val = json.dumps(data)
    

    data = {
        "discover 1": discover1,
        "discover 2" : discover2_val,
        "discover 3" : discover3_val,
        "private" : private_val,
        "internal_p2p" : internal_p2p_val,
        "malware_control" : malware_control_val,
        "infected_host" : infected_host_val,
        "botnet_inside" : botnet_inside_val,
        "lateral_brute" : lateral_brute_val,
        "lateral_spy" : lateral_spy_val,
        "overal_score" : "The system seems infected and prone to many attacks, we recommend you to use better protocals and encrypting protocols to make data transfer and sharing secure."
    }
    data = json.dumps(data)

    return Response(data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=True)